import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
export async function POST(req: Request) {
  const { title, targetAmount, savings, timeHorizon, riskPreference, monthlyInvestment } =
    await req.json();
  if (
    !title ||
    !targetAmount ||
    !savings ||
    !timeHorizon ||
    !riskPreference ||
    !monthlyInvestment
  ) {
    return NextResponse.json({ message: 'Please fill the complete form' }, { status: 400 });
  }
  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `Help the user plan for the following goal:

Goal: ${title}
Target Amount: $${targetAmount}
Current Savings: $${savings}
Time Horizon: ${timeHorizon} years
Risk Preference: ${riskPreference}
Monthly Investment Capability: $${monthlyInvestment}
Priority: High

Please suggest:
- Whether the goal is achievable or not
- How much should the user invest monthly if not achievable
- What kind of investment plan (safe vs moderate vs aggressive)
- One motivational line
`,
    });
    return NextResponse.json({ aiResponse: aiResponse.text });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
