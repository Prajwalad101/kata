import mongoose from 'mongoose';
import './loadEnv';
import cron from 'node-cron';
import User from './models/userModel';

process.on('uncaughtException', (err: Error) => {
  console.log('Uncaught Exception. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

import app from './app';
import { userSchedule } from './schedules/userSchedule';
import { interactionSchedule } from './schedules/interactionSchedule';

const DB = process.env.DB as string;

mongoose.set('strictQuery', false);
mongoose.connect(DB).then(() => {
  console.log('DB connection successful');
});

// cron schedules
userSchedule();
interactionSchedule();

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
