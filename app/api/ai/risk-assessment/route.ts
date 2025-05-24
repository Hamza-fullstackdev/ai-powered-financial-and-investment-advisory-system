import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
export async function POST(req: Request) {
  const {
    age,
    income,
    savings,
    experience,
    timeHorizon,
    marketDrop,
    financialGoal,
    lossTolerance,
    takeLoan,
  } = await req.json();
  if (
    !age ||
    !income ||
    !savings ||
    !experience ||
    !timeHorizon ||
    !marketDrop ||
    !financialGoal ||
    !lossTolerance ||
    !takeLoan
  ) {
    return NextResponse.json({ message: 'Please fill the complete form' }, { status: 400 });
  }
  try {
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `I want you to analyze a user's risk profile based on the following information. Classify the user as Low Risk, Medium Risk, or High Risk and explain why in 2-3 lines.

User Info:
1. Age Group: ${age}
2. Income Source: ${income}
3. Monthly Savings: ${savings}
4. Investment Experience: ${experience}
5. Investment Time Horizon: ${timeHorizon}
6. Reaction to Market Drop: Will do ${marketDrop}
7. Financial Goal: ${financialGoal}
8. Max Loss Tolerable in 1 Year: ${lossTolerance}
9. Credit/Lending Habit: ${takeLoan} uses credit

Please give:
- Risk Category (Low/Medium/High)
- One line explanation
- Suggested investment strategy in 2 points
`,
    });
    return NextResponse.json({ aiResponse: aiResponse.text }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
