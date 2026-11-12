import { NextResponse } from 'next/server';
import { getSessionCookieDetails } from '@/lib/auth';

export async function POST() {
  const cookieDetails = getSessionCookieDetails();
  const response = NextResponse.json({ success: true, message: 'Logged out' });
  response.cookies.delete(cookieDetails.name);
  return response;
}

