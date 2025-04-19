import { connectToDatabase } from '@/app/api/utils/db';
import User from '@/app/model/User';
import { config } from '@/app/api/utils/env-config';
import { hashedPassword } from '@/app/api/utils/hashing';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import Notification from '@/app/model/Notification';

export async function POST(req: Request) {
  await connectToDatabase();
  const { fname, lname, email, profileImg } = await req.json();
  try {
    const isUserExist = await User.findOne({ email });
    if (isUserExist) {
      const token = jwt.sign({ id: isUserExist._id.toString() }, config.jwtSecretKey as string);
      await Notification.create({
        userId: isUserExist._id,
        title: 'Welcome back!',
        message: `Welcome back ${isUserExist.fname}!, we are excited to see you again!`,
        type: 'login',
      });
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
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const newUser = new User({
        fname: fname,
        lname: lname,
        email: email,
        password: await hashedPassword(generatedPassword),
        profileImg: profileImg,
      });
      try {
        await newUser.save();
        const token = jwt.sign({ id: newUser._id }, config.jwtSecretKey as string);
        await Notification.create({
          userId: newUser._id,
          title: 'Welcome aboard!',
          message: `Welcome aboard ${newUser.fname}!, we are excited to have you!`,
          type: 'signup',
        });
        const response = NextResponse.json(
          {
            message: 'User created successfully',
            user: {
              _id: newUser._id,
              fname: newUser.fname,
              lname: newUser.lname,
              email: newUser.email,
              profileImg: newUser.profileImg,
              createdAt: newUser.createdAt,
              updatedAt: newUser.updatedAt,
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
      } catch (error) {
        return NextResponse.json({ message: 'Error creating user' }, { status: 500 });
      }
    }
  } catch (error) {
    return NextResponse.json({ message: 'Failed to create user' }, { status: 500 });
  }
}
