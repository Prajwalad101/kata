import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function generateAccessToken(user: any) {
  const expiresIn = '10h';
  const secret = process.env.AUTH_SECRET as string;

  const token = jwt.sign(user.toJSON(), secret, {
    expiresIn: expiresIn,
    subject: user.providerId,
  });

  return token;
}
