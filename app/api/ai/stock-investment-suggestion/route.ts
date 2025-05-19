import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  const { stock } = await req.json();
  if (!stock) {
    return NextResponse.json({ message: 'Please enter a stock name to continue' }, { status: 400 });
  }
  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-preview-04-17',
      contents: `Act Like you are a professional financial and investment advisory assistant (Don't give a hint to the user about that you are an AI). And then suggest if investing in this stock is a good idea (in short paragraph): Stock Name: ${stock}`,
    });
    return NextResponse.json({ aiResponse: aiResponse.text });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
