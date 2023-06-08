import { NextFunction, Response, Request } from 'express';
import catchAsync from '../../utils/catchAsync';
import jwt from 'jsonwebtoken';

export const handleAdminLogin = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      res.status(400).json({ message: 'Please provide email and password' });
    }

    if (email !== 'prajwalad101@gmail.com' || password !== 'password123') {
      res.status(401).json({ message: 'Invalid credentials' });
    }

    const secret = process.env.AUTH_SECRET as string;

    const accessToken = jwt.sign({ email, name: 'PrajwalAdhikari' }, secret, {
      expiresIn: '10h',
      subject: 'admin',
    });

    res.json({ message: 'Admin login', accessToken });
  }
);
