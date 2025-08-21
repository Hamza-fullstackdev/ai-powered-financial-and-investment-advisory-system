import { connectToDatabase } from '@/app/api/utils/db';
import Contact from '@/app/model/Contact';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  await connectToDatabase();
  const { name, email, subject, message } = await request.json();
  try {
    const contact = { name, email, subject, message };
    if (!name || !email || !subject || !message)
      return NextResponse.json({ message: 'Please fill all fields' }, { status: 400 });
    await Contact.create(contact);
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
