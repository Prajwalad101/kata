import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import passport from 'passport';
import globalErrorHandler from './controllers/errorController';
import authRouter from './routes/authRoutes';
import businessRouter from './routes/businessRoutes';
import adminBusinessRouter from './routes/admin/adminBusinessRouter';
import reviewRouter from './routes/reviewRoutes';
import userRouter from './routes/userRoutes';
import questionRouter from './routes/questionRoutes';
import mailRouter from './routes/mailRoutes';
import AppError from './utils/appError';
import adminAuthRouter from './routes/admin/adminAuthRouter';
import adminLogsRouter from './routes/admin/adminLogsRouter';
import adminReviewsRouter from './routes/admin/adminReviewsRouter';
import adminUserRouter from './routes/admin/adminUserRouter';
import cors from 'cors';
import Logger from './models/loggerModel';

const app = express();

app.use(cors());

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

app.use((req, res, next) => {
  const method = req.method;
  const endpoint = req.originalUrl;
  const request = req.body;

  res.on('finish', async () => {
    const status = res.statusCode;
    await Logger.create({ method, endpoint, status, request });
  });
  next();
});
app.use(passport.initialize());

// public routes
app.use('/api/business', businessRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/questions', questionRouter);
app.use('/api/mail', mailRouter);

// Admin routes
app.use('/api/admin/auth', adminAuthRouter);
app.use('/api/admin/business', adminBusinessRouter);
app.use('/api/admin/reviews', adminReviewsRouter);
app.use('/api/admin/logs', adminLogsRouter);
app.use('/api/admin/users', adminUserRouter);

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
