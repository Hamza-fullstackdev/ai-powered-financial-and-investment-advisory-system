import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { connectToDatabase } from '@/app/api/utils/db';
import { config } from '@/app/api/utils/env-config';
import Notification from '@/app/model/Notification';

export async function GET(req: NextRequest) {
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
    const notifications = await Notification.find({ userId }).sort({ createdAt: -1 });

    return NextResponse.json({ notifications });
  } catch (err) {
    console.error('Notification fetch error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
