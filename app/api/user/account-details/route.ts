import { connectToDatabase } from '@/app/api/utils/db';
import Account from '@/app/model/Account';
import Notification from '@/app/model/Notification';
import { config } from '@/app/api/utils/env-config';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import Card from '@/app/model/Card';

export async function POST(req: Request) {
  await connectToDatabase();
  const {
    totalBalance,
    amountInvested,
    monthlyIncome,
    monthlyBudget,
    accountType,
    cardNumber,
    cardHolder,
    cardCvc,
  } = await req.json();
  if (
    !totalBalance ||
    !amountInvested ||
    !monthlyIncome ||
    !monthlyBudget ||
    !accountType ||
    !cardNumber ||
    !cardHolder ||
    !cardCvc
  ) {
    return NextResponse.json({ message: 'Please fill the complete form' }, { status: 400 });
  }
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
    const isAccountExist = await Card.findOne({ cardNumber });
    if (isAccountExist) {
      return NextResponse.json({ message: 'Card already exists' }, { status: 400 });
    }
    const newAccount = new Account({
      totalBalance,
      amountInvested,
      monthlyIncome,
      monthlyBudget,
      accountType,
      userId,
    });
    const newCard = new Card({
      cardNumber,
      cardHolder,
      cardCvc,
      userId,
    });
    await newAccount.save();
    await newCard.save();
    await Notification.create({
      userId,
      type: 'Account Creation',
      title: 'Account Creation',
      message: 'Your account has been created successfully',
    });
    await Notification.create({
      userId,
      type: 'New Card',
      title: 'New Card Added',
      message: 'Your card has been added successfully',
    });
    return NextResponse.json({ message: 'Account created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating account' }, { status: 500 });
  }
}
