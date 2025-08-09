import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import Conservation from '@/app/model/Conservation';
import { connectToDatabase } from '@/app/api/utils/db';
import { cookies } from 'next/headers';
import { config } from '@/app/api/utils/env-config';
import jwt from 'jsonwebtoken';

const ai = new GoogleGenAI({ apiKey: config.llmApiKey! });

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('AI request timed out'));
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}
export async function POST(req: Request) {
  try {
    await connectToDatabase();

    const { prompt, userId } = await req.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { message: 'Prompt is required and must be a string.' },
        { status: 400 }
      );
    }

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json(
        { message: 'User ID is required and must be a string.' },
        { status: 400 }
      );
    }

    const modelPrompt = `
You are a finance and investment assistant. Reply confidently and helpfully on topics like:
- finance, investment, wealth, stocks, crypto, real estate, economics, savings, retirement.

Only respond if relevant. Do NOT include disclaimers.

User prompt: ${prompt}
`;
    const aiResponse = await withTimeout(
      ai.models.generateContent({
        model: config.llmModel!,
        contents: modelPrompt,
      }),
      15000
    );

    const aiResponseText = aiResponse?.text?.trim();

    if (!aiResponseText) {
      return NextResponse.json({ message: 'AI failed to return a response.' }, { status: 502 });
    }
    try {
      const existing = await Conservation.findOne({ userId });

      if (existing) {
        await Conservation.updateOne(
          { userId },
          { $push: { conservation: { prompt, response: aiResponseText } } }
        );
      } else {
        await Conservation.create({
          userId,
          conservation: [{ prompt, response: aiResponseText }],
        });
      }
    } catch (dbError: any) {
      console.error('DB Error:', dbError);

      if (dbError.name === 'MongoNetworkError') {
        return NextResponse.json({ message: 'Database connection failed.' }, { status: 503 });
      }

      if (dbError.code === 11000) {
        return NextResponse.json({ message: 'Duplicate entry error.' }, { status: 409 });
      }

      if (dbError.message?.includes('validation failed')) {
        return NextResponse.json(
          { message: 'Invalid data format while saving conversation.' },
          { status: 400 }
        );
      }

      return NextResponse.json({ message: 'Failed to save conversation.' }, { status: 500 });
    }

    return NextResponse.json({ aiResponse: aiResponseText });
  } catch (error: any) {
    if (error.message === 'AI request timed out') {
      return NextResponse.json(
        { message: 'The request to the AI model timed out.' },
        { status: 504 }
      );
    }

    return NextResponse.json({ message: 'Something went wrong.' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  await connectToDatabase();
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const decoded = jwt.verify(token, config.jwtSecretKey as string) as { id: string };
    if (!decoded.id) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
    }
    const userId = decoded.id;
    const conservation = await Conservation.findOne({ userId }).sort({ createdAt: -1 });
    return NextResponse.json({ conservation });
  } catch (err) {
    console.error('Chatting fetch error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
