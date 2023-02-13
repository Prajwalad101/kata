import { NextFunction, Request, Response } from 'express';
import Business from '../../models/businessModel';
import Review from '../../models/reviewModel';
import AppError from '../../utils/appError';
import catchAsync from '../../utils/catchAsync';

// increments the fields (rating_count, total_rating) when a review is created
export const incrementBusinessRating = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.body.business) {
      return next(new AppError('No business id found', 400));
    }
    if (!req.body.rating) {
      return next(new AppError('No rating found', 400));
    }

    const business = await Business.findById(req.body.business);
    if (!business) {
      return next(new AppError('No business with that id found', 400));
    }

    const rating = req.body.rating;
    const ratingIndex = rating - 1;

    business.ratings[ratingIndex] += 1;
    await business.save();
    next();
  }
);

// updates the field (total_rating) when a review is updated
export const updateBusinessRating = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.body.rating) return next();

    // throw error if businessId is not given (make businessId mandatory)
    if (!req.query.business)
      return next(new AppError('No business id found.', 400));

    // get the old rating and update new rating based on that
    const review = await Review.findById(req.params.id);
    if (!review) return next();

    // increment new rating by the difference between new and previous rating
    const incrementBy = req.body.rating - review.rating;

    const business = await Business.findById(req.query.business);
    if (!business) return next();

    business.total_rating += incrementBy; // increment or decrement total_rating (depends on incrementBy)
    await business.save();

    next();
  }
);

// updates the fields (rating_count, total_rating) when a review is deleted
export const deleteBusinessRating = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    // find the rating of the review
    const review = await Review.findById(req.params.id);
    if (!review) return next();

    const rating = review.rating;

    const business = await Business.findById(review.business);
    if (!business) return next();

    business.rating_count -= 1; // decrement rating_count
    business.total_rating -= rating; // decrement total_rating by the current rating
    await business.save();

    next();
  }
);
