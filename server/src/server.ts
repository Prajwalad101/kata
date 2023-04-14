import mongoose from 'mongoose';
import './loadEnv';
import { userSchedule } from './schedules/userSchedule';
import { interactionSchedule } from './schedules/interactionSchedule';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
