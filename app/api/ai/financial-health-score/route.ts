import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import { config } from '@/app/api/utils/env-config';

const ai = new GoogleGenAI({ apiKey: config.llmApiKey! });
export async function POST(req: Request) {
  const { monthlyIncome, totalExpenses, totalDebt, totalInvestments, totalSavings, emergencyFund } =
    await req.json();
  if (
    !monthlyIncome ||
    !totalExpenses ||
    !totalDebt ||
    !totalInvestments ||
    !totalSavings ||
    !emergencyFund
  ) {
    return NextResponse.json({ message: 'Please fill the complete form' }, { status: 400 });
  }
  try {
    const aiResponse = await ai.models.generateContent({
      model: config.llmModel!,
      contents: `I want you to analyze a user's financial health (FHI) based on the following information. Classify the user's financial health as score from 0 to 100 and explain why in 2-3 lines.

Monthly Income: $${monthlyIncome}
Total Expenses: $${totalExpenses}
Total Debt: $${totalDebt}
Total Investments: $${totalInvestments}
Total Savings: $${totalSavings}
Emergency Fund: $${emergencyFund}

Please give a short summary of the user's financial health and explain why in 2-3 lines.`,
    });
    return NextResponse.json({ aiResponse: aiResponse.text }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
