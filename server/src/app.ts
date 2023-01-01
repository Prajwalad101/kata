import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import globalErrorHandler from './controllers/errorController';
import businessRouter from './routes/businessRoutes';
import reviewRouter from './routes/reviewRoutes';
import AppError from './utils/appError';

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/business', businessRouter);
app.use('/api/reviews', reviewRouter);

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
