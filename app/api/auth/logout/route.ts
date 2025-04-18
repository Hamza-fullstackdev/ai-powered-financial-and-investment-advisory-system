import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Successfully logged out.' }, { status: 200 });
  response.cookies.set({
    name: 'token',
    value: '',
    path: '/',
    maxAge: 0,
    httpOnly: true,
  });

  return response;
}
