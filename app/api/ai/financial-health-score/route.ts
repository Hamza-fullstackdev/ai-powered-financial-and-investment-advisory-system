import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
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
    const calculateFinancialHealthScore = () => {
      const savingsRate = totalSavings / monthlyIncome;
      const investmentRate = totalInvestments / monthlyIncome;
      const debtToIncomeRatio = 1 - totalDebt / monthlyIncome;
      const emergencyFundFactor = Math.min(emergencyFund / (monthlyIncome * 3), 1);
      const expenseToIncomeRatio = 1 - totalExpenses / monthlyIncome;

      const score = Math.floor(
        (savingsRate * 0.25 +
          investmentRate * 0.25 +
          debtToIncomeRatio * 0.2 +
          emergencyFundFactor * 0.15 +
          expenseToIncomeRatio * 0.15) *
          100
      );

      return Math.max(0, Math.min(score, 100));
    };
    const aiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: `I want you to analyze a user's financial health based on the following information. Classify the user's financial health as Low, Medium, or High and explain why in 2-3 lines.

Monthly Income: $${monthlyIncome}
Total Expenses: $${totalExpenses}
Total Debt: $${totalDebt}
Total Investments: $${totalInvestments}
Total Savings: $${totalSavings}
Emergency Fund: $${emergencyFund}

Please give a short summary of the user's financial health and explain why in 2-3 lines.`,
    });
    const financialHealthScore = calculateFinancialHealthScore();
    return NextResponse.json(
      { financialHealthScore, aiResponse: aiResponse.text },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
