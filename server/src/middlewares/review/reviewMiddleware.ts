import { NextFunction, Request, Response } from 'express';
import Business from '../../models/businessModel';
import Review from '../../models/reviewModel';
import AppError from '../../utils/appError';
import catchAsync from '../../utils/catchAsync';

// updates business when a review is updated
export const updateBusinessRating = catchAsync(
  async (req: Request, _res: Response, next: NextFunction) => {
    if (!req.body.rating) return next();

    // throw error if businessId is not given (make businessId mandatory)
    if (!req.query.business)
      return next(new AppError('No business id found.', 400));

    const review = await Review.findById(req.params.id);
    if (!review) return next();

    const business = await Business.findById(req.query.business);
    if (!business) return next();

    // get the index of previous rating
    const prevRatingIndex = business.ratings.indexOf(review.rating);
    const newRatingIndex = req.body.rating - 1;

    // decrease previous rating and increase new rating
    const newBusinessRating = business.ratings.map((rating, index) => {
      if (index === prevRatingIndex) {
        return rating - 1;
      }
      if (index === newRatingIndex) {
        return rating + 1;
      }
      return rating;
    }) as [number, number, number, number, number];

    business.ratings = newBusinessRating;
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
