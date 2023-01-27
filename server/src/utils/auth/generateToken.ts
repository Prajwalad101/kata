import jwt from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function generateAccessToken(user: any) {
  const expiresIn = '10h';
  const secret = process.env.AUTH_SECRET as string;

  const payload = {
    user: user.username,
    provider: user.provider,
    email: user.email,
    picture: user.picture,
    providerId: user.providerId,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: expiresIn,
    subject: user.providerId,
  });

  return token;
}
