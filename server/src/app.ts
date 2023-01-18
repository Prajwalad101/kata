import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import globalErrorHandler from './controllers/errorController';
import authRouter from './routes/authRoutes';
import businessRouter from './routes/businessRoutes';
import reviewRouter from './routes/reviewRoutes';
import userRouter from './routes/userRoutes';
import AppError from './utils/appError';
import './utils/auth/jwt';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
// app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
// app.use(passport.session());

// Routes
app.use(
  '/api/business',
  passport.authenticate('jwt', { session: false }),
  businessRouter
);
app.use('/api/reviews', reviewRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

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
