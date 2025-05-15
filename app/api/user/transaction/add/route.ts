import { connectToDatabase } from '@/app/api/utils/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { config } from '@/app/api/utils/env-config';
import { NextResponse } from 'next/server';
import Transaction from '@/app/model/Transaction';

export async function POST(req: Request) {
  await connectToDatabase();
  const { merchantName, amount, date, category, description } = await req.json();
  if (!merchantName || !amount || !date || !category || !description) {
    return NextResponse.json({ message: 'Please fill the complete form' }, { status: 400 });
  }
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const decoded = jwt.verify(token, config.jwtSecretKey as string) as { id: string };
    if (!decoded.id) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 403 });
    }
    const userId = decoded.id;

    const transaction = await Transaction.create({
      merchantName,
      amount,
      date,
      category,
      description,
      userId,
    });
    if (!transaction) {
      return NextResponse.json({ message: 'Failed to add transaction' }, { status: 500 });
    }
    return NextResponse.json({ message: 'Transaction added successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to add transaction' }, { status: 500 });
  }
}
