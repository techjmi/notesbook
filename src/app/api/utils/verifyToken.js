import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
export const verifyJwt = async () => {
  try {
    // let cookieStore= await cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;
    // console.log('the token is ', token)
    if (!token) {
      throw new Error('No token found');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log('decodes', decoded)
    return decoded;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    throw new Error('Unauthorized');
  }
};
