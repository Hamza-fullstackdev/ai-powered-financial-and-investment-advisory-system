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

    const existingAccount = await Account.findOne({ userId });
    if (existingAccount) {
      await Account.updateOne(
        { userId },
        { totalBalance, amountInvested, monthlyIncome, monthlyBudget, accountType }
      );

      await Notification.create({
        userId,
        type: 'Account Update',
        title: 'Account Updated',
        message: 'Your account details were updated successfully',
      });
    } else {
      await Account.create({
        userId,
        totalBalance,
        amountInvested,
        monthlyIncome,
        monthlyBudget,
        accountType,
      });

      await Notification.create({
        userId,
        type: 'Account Creation',
        title: 'New Account Created',
        message: 'Your account has been created successfully',
      });
    }
    const existingCard = await Card.findOne({ userId });
    if (existingCard) {
      await Card.updateOne({ userId }, { cardNumber, cardHolder, cardCvc });

      await Notification.create({
        userId,
        type: 'Card Update',
        title: 'Card Updated',
        message: 'Your card details were updated successfully',
      });
    } else {
      await Card.create({
        userId,
        cardNumber,
        cardHolder,
        cardCvc,
      });

      await Notification.create({
        userId,
        type: 'New Card',
        title: 'Card Added',
        message: 'Your new card has been added successfully',
      });
    }

    return NextResponse.json(
      { message: 'Account and card processed successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Server error occurred' }, { status: 500 });
  }
}
