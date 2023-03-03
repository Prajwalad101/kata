import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import globalErrorHandler from './controllers/errorController';
import authRouter from './routes/authRoutes';
import businessRouter from './routes/businessRoutes';
import reviewRouter from './routes/reviewRoutes';
import userRouter from './routes/userRoutes';
import questionRouter from './routes/questionRoutes';
import mailRouter from './routes/mailRoutes';
import AppError from './utils/appError';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Routes
app.use('/api/business', businessRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);
app.use('/api/mail', mailRouter);

app.all('*', (req: Request, _res: Response, next: NextFunction) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404
  );
  next(err);
});

// Gobal error handling middleware
app.use(globalErrorHandler);

export default app;
