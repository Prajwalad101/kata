import express, { NextFunction, Request, Response } from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import globalErrorHandler from './controllers/errorController';
import authRouter from './routes/authRoutes';
import businessRouter from './routes/businessRoutes';
import reviewRouter from './routes/reviewRoutes';
import AppError from './utils/appError';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(session({ secret: 'cats' }));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/business', businessRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/auth', authRouter);

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
