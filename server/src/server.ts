import mongoose from 'mongoose';
import './loadEnv';

process.on('uncaughtException', (err: Error) => {
  console.log('Uncaught Exception. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app';

const DB = process.env.DB as string;

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

const server = app.listen(process.env.PORT, () => {
  console.log('The server is listening on port', process.env.PORT);
});

process.on('unhandledRejection', (err: Error) => {
  console.log('Unhandled Rejection. Shutting down...');
  console.log(err.name, err.message);

  server.close(() => {
    process.exit(1);
  });
});
