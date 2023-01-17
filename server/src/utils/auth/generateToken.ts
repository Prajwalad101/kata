import jwt from 'jsonwebtoken';

export default function generateAccessToken(userId: string) {
  const expiresIn = '1 hour';
  const secret = process.env.AUTH_SECRET as string;

  const token = jwt.sign({}, secret, {
    expiresIn: expiresIn,
    subject: userId,
  });

  return token;
}
