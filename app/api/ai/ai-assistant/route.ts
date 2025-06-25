import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import Conservation from '@/app/model/Conservation';
import { connectToDatabase } from '@/app/api/utils/db';
import { cookies } from 'next/headers';
import { config } from '@/app/api/utils/env-config';
import jwt from 'jsonwebtoken';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  const { prompt, userId } = await req.json();
  if (!prompt) {
    return NextResponse.json({ message: 'Please give a prompt to continue' }, { status: 400 });
  }
  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a professional financial and investment advisory assistant. Your tone is helpful, confident, and courteous.

Your ONLY job is to provide detailed advice, analysis, or guidance related to:
- finance
- investment
- personal wealth
- stock markets
- economics
- retirement or savings planning

ONLY answer if the user query is related to these topics.

Avoid generic disclaimers like "I'm not a financial advisor", "consult with a qualified financial advisor" or "This is not financial advice.

Here is the user prompt: ${prompt}`,
    });

    const aiResponseText = aiResponse.text;
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
    return NextResponse.json({ aiResponse: aiResponseText });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
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
    console.error('Notification fetch error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
