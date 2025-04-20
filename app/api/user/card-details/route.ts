import { connectToDatabase } from '@/app/api/utils/db';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { config } from '@/app/api/utils/env-config';
import { NextResponse } from 'next/server';
import Card from '@/app/model/Card';

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
    const getCardInfo = await Card.find({ userId });
    if (!getCardInfo || getCardInfo.length === 0) {
      return NextResponse.json({ error: 'Card details not found' }, { status: 404 });
    }
    return NextResponse.json(
      {
        length: getCardInfo.length,
        getCardInfo,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
