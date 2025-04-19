import { connectToDatabase } from '@/app/api/utils/db';
import User from '@/app/model/User';
import { NextResponse } from 'next/server';
import { comparePassword } from '@/app/api/utils/hashing';
import { config } from '@/app/api/utils/env-config';
import jwt from 'jsonwebtoken';
import Notification from '@/app/model/Notification';

interface LoginRequestBody {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  await connectToDatabase();

  let body: LoginRequestBody;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: 'Invalid JSON payload' }, { status: 400 });
  }

  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json(
      { message: 'Password must be at least 8 characters long' },
      { status: 400 }
    );
  }

  try {
    const isUserExist = await User.findOne({ email });

    if (!isUserExist) {
      return NextResponse.json({ message: 'User does not exist' }, { status: 400 });
    }

    const isPasswordMatch = await comparePassword(password, isUserExist.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
    }

    let token: string;
    try {
      token = jwt.sign({ id: isUserExist._id.toString() }, config.jwtSecretKey as string, {
        expiresIn: '7d',
      });
    } catch (err) {
      return NextResponse.json({ message: 'Failed to create token' }, { status: 500 });
    }

    const response = NextResponse.json(
      {
        message: 'User logged in successfully',
        user: {
          _id: isUserExist._id.toString(),
          fname: isUserExist.fname,
          lname: isUserExist.lname,
          email: isUserExist.email,
          profileImg: isUserExist.profileImg,
          userAgent: req.headers.get('user-agent'),
          signupMethod: isUserExist.signupMethod,
          createdAt: isUserExist.createdAt,
          updatedAt: isUserExist.updatedAt,
        },
      },
      { status: 200 }
    );
    await Notification.create({
      userId: isUserExist._id,
      title: 'Welcome back!',
      message: `Welcome back ${isUserExist.fname}!, we are excited to see you again!`,
      type: 'login',
    });
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (err) {
    console.error('Login error:', err);
    return NextResponse.json(
      { message: 'Error logging in user', error: (err as Error).message },
      { status: 500 }
    );
  }
}
