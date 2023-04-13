import mongoose from 'mongoose';
import './loadEnv';
import cron from 'node-cron';
import Cooldown from './models/cooldownModel';
import User from './models/userModel';

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

// schedule a cron job every day at 12:00 pm
cron.schedule(
  '31 18 * * *',
  async () => {
    // find the documents that have exceeded their cooldown period
    const cooldowns = await Cooldown.aggregate([
      {
        $project: {
          createdAt: 1,
          cooldownPeriod: 1,
          user: 1,
          timeDifference: { $subtract: [new Date(), '$createdAt'] },
        },
      },
      {
        $addFields: {
          timeDifferenceInHours: {
            $divide: ['$timeDifference', 1000 * 60 * 60],
          },
        },
      },
      {
        $match: {
          $expr: {
            $gte: ['$timeDifferenceInHours', '$cooldownPeriod'],
          },
        },
      },
    ]);

    cooldowns.forEach((cooldown) => {
      const cooldownPromise = Cooldown.findByIdAndDelete(cooldown._id).exec();
      const userPromise = User.findByIdAndUpdate(
        cooldown.user,
        {
          onCooldown: false,
        },
        { new: true }
      ).exec();

      Promise.all([cooldownPromise, userPromise]).then();
    });
  },
  {
    scheduled: true,
    timezone: 'Asia/Kathmandu',
  }
);

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
