import { connectToDatabase } from '@/app/api/utils/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { config } from '@/app/api/utils/env-config';
import { NextResponse } from 'next/server';
import Transaction from '@/app/model/Transaction';
import mongoose from 'mongoose';

export async function GET(req: Request) {
  await connectToDatabase();
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
    const spendingByCategory = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: '$category',
          totalAmount: { $sum: '$amount' },
        },
      },
      {
        $project: {
          _id: 0,
          category: '$_id',
          totalAmount: 1,
        },
      },
    ]);

    return NextResponse.json({ spendingByCategory }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
