import { connectToDatabase } from '@/app/api/utils/db';
import Notification from '@/app/model/Notification';
import User from '@/app/model/User';
import { NextRequest, NextResponse } from 'next/server';
import { config } from '@/app/api/utils/env-config';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import Account from '@/app/model/Account';
import Card from '@/app/model/Card';
import Transaction from '@/app/model/Transaction';
import Conservation from '@/app/model/Conservation';

export async function DELETE(req: NextRequest) {
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
    const deletedUser = await User.findByIdAndDelete(userId);
    await Notification.deleteMany({ userId });
    await Account.deleteMany({ userId });
    await Card.deleteMany({ userId });
    await Transaction.deleteMany({ userId });
    await Conservation.deleteMany({ userId });
    if (!deletedUser) {
      return NextResponse.json(
        { message: 'Unauthorized, please logout of your account' },
        { status: 404 }
      );
    }
    const response = NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
    response.cookies.set({
      name: 'token',
      value: '',
      path: '/',
      maxAge: 0,
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user' }, { status: 500 });
  }
}
