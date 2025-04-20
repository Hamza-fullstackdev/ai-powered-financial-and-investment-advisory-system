import { connectToDatabase } from '@/app/api/utils/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { config } from '@/app/api/utils/env-config';
import { NextResponse } from 'next/server';
import Account from '@/app/model/Account';

export async function GET(req: Request) {
  await connectToDatabase();
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
    const getAccountInfo = await Account.findOne({ userId });
    if (!getAccountInfo) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }
    return NextResponse.json(
      {
        getAccountInfo,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
