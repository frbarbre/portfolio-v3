import { NextResponse } from 'next/server';

export async function POST() {
  console.log('Hello World');
  return NextResponse.json({ message: 'Ran CRON Job' });
}
