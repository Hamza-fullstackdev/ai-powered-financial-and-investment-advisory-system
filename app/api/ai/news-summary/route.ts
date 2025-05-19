import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  const { url } = await req.json();
  if (!url) {
    return NextResponse.json({ message: 'Please give a news URL to continue' }, { status: 400 });
  }
  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: `Summarize the content of this article news: ${url}`,
    });

    return NextResponse.json({ aiResponse: aiResponse.text });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
