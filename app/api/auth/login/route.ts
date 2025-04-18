import { connectToDatabase } from '@/app/api/utils/db';
import User from '@/app/model/User';
import { NextResponse } from 'next/server';
import { hashedPassword } from '@/app/api/utils/hashing';
import { config } from '@/app/api/utils/env-config';
import jwt from 'jsonwebtoken';

export async function POST(req: Request) {
  await connectToDatabase();
  const { email, password } = await req.json();
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
    } else {
      const isPasswordMatch = await hashedPassword(password, isUserExist.password);
      if (!isPasswordMatch) {
        return NextResponse.json({ message: 'Invalid credentials' }, { status: 400 });
      } else {
        const token = jwt.sign({ id: isUserExist._id }, config.jwtSecretKey);
        const response = NextResponse.json(
          {
            message: 'User logged in successfully',
            user: {
              _id: isUserExist._id,
              fname: isUserExist.fname,
              lname: isUserExist.lname,
              email: isUserExist.email,
              profileImg: isUserExist.profileImg,
              createdAt: isUserExist.createdAt,
              updatedAt: isUserExist.updatedAt,
            },
          },
          { status: 200 }
        );
        response.cookies.set('token', token, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 7,
          sameSite: 'strict',
        });
        return response;
      }
    }
  } catch (err) {
    return NextResponse.json({ message: 'Error logging in user', error: err }, { status: 500 });
  }
}
