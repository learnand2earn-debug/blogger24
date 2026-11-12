import { NextResponse } from 'next/server';
import { getSessionCookieDetails, validateAdminCredentials } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: 'Password is required' }, { status: 400 });
    }

    if (!validateAdminCredentials(password)) {
      return NextResponse.json({ error: 'Invalid administrator credentials' }, { status: 401 });
    }

    const cookieDetails = getSessionCookieDetails();
    const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
    response.cookies.set(cookieDetails.name, cookieDetails.value, cookieDetails.options);

    return response;
  } catch (error) {
    return NextResponse.json({ error: 'Server authentication error' }, { status: 500 });
  }
}

