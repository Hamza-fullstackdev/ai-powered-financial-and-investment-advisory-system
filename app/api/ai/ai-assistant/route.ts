import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ message: 'Please give a prompt to continue' }, { status: 400 });
  }
  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `You are a professional financial and investment advisory assistant.

Your ONLY job is to provide detailed advice, analysis, or guidance related to:
- finance
- investment
- personal wealth
- stock markets
- economics
- retirement or savings planning

ONLY answer if the user query is related to these topics.  
If the query is NOT related to any of these, respond ONLY with:  
**"I'm only here to assist with finance and investment-related topics."**

Here is the user prompt: ${prompt}`,
    });

    return NextResponse.json({ aiResponse: aiResponse.text });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
