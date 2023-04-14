import User from '../../models/userModel';
import AppError from '../appError';

export const validateUser = async (userId: string) => {
  let user;
  try {
    user = await User.findById(userId);
    if (!user) {
      const error = new AppError('User does not exist', 404);
      throw error;
    }
  } catch (error) {
    throw error;
  }

  if (user?.suspended) {
    const error = new AppError(
      'Your account has been suspended due to violation of our terms. Please contact support',
      401
    );
    throw error;
  }
  if (user?.banned) {
    const error = new AppError(
      'Your account has been banned due to violation of our terms',
      401
    );
    throw error;
  }
};
