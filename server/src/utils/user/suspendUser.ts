import Timer from '../../models/timerModel';
import User from '../../models/userModel';
import AppError from '../appError';

export const suspendUser = async (userId: string) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new AppError('User not found', 404);
    }

    user.suspendedCount += 1;

    let suspendDuration = 0;
    switch (user.suspendedCount) {
      case 1:
        suspendDuration = 24; // 1 day
        break;
      case 2:
        suspendDuration = 168;
        break;
      case 3:
        suspendDuration = 720;
        break;
      default:
        user.banned = true;
    }

    // ban user instead of suspending
    if (suspendDuration > 0) {
      user.suspended = true;
      await Timer.create({
        user: userId,
        duration: suspendDuration,
        action: 'suspend',
      });
    }
    await user.save();
  } catch (error) {
    throw error;
  }
};
