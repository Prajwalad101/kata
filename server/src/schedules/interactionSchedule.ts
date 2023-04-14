import cron from 'node-cron';
import Interaction from '../models/interactionsModel';

// clears Interaction collection every Sunday at 12:00 PM
export const interactionSchedule = () => {
  cron.schedule(
    '0 12 * * Sun',
    async () => {
      await Interaction.deleteMany({});
    },
    {
      scheduled: true,
      timezone: 'Asia/Kathmandu',
    }
  );
};
