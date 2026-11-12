import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'UbaidAdmin2026!';
const SESSION_COOKIE_NAME = 'ubaid_admin_session';
const SESSION_TOKEN = 'ubaid-auth-session-valid-token-2026';

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = cookies();
  const session = cookieStore.get(SESSION_COOKIE_NAME);
  return session?.value === SESSION_TOKEN;
}

export function validateAdminCredentials(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function getSessionCookieDetails() {
  return {
    name: SESSION_COOKIE_NAME,
    value: SESSION_TOKEN,
    options: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax' as const,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    }
  };
}

