import { connectToDatabase } from '@/app/api/utils/db';
import { hashedPassword } from '@/app/api/utils/hashing';
import User from '@/app/model/User';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, context: { params: { id: string } }) {
  await connectToDatabase();
  const { id } = await context.params;
  const { fname, lname, email, password, profileImg } = await req.json();
  try {
    const user = await User.findById(id);
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }
    let encryptedPassword = user.password;
    if (password) {
      if (password.length < 8) {
        return NextResponse.json(
          { message: 'Password should be at least 8 characters' },
          { status: 400 }
        );
      }
      encryptedPassword = await hashedPassword(password);
    }
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fname,
        lname,
        email,
        profileImg,
        password: encryptedPassword,
      },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ message: 'Error updating user' }, { status: 500 });
    }
    return NextResponse.json(
      {
        message: 'User updated successfully',
        user: {
          _id: updatedUser._id.toString(),
          fname: updatedUser.fname,
          lname: updatedUser.lname,
          email: updatedUser.email,
          profileImg: updatedUser.profileImg,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: 'Internal server error', error: (error as Error).message },
      { status: 500 }
    );
  }
}
