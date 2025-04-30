// /app/api/auth/logout/route.js (Next.js 13/14 with app router)
import { NextResponse } from 'next/server';
export async function POST() {
  const response = NextResponse.json({ message: 'Logout successful' });
  response.cookies.set('access_token', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  return response;
}
