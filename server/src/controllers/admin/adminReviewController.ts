import { NextFunction, Request, Response } from 'express';
import Review from '../../models/reviewModel';
import { APIFeatures } from '../../utils/apiFeatures';
import AppError from '../../utils/appError';
import catchAsync from '../../utils/catchAsync';

const getAllReviews = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const reviewQuery = Review.find();

    reviewQuery.populate({
      path: 'author',
    });

    if (req.query._end && req.query._start) {
      req.query.limit = String(
        Number(req.query._end) - Number(req.query._start)
      );
      req.query.skip = req.query._start;

      // delete original query params
      delete req.query._end;
      delete req.query._start;
    }

    const features = new APIFeatures(reviewQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const reviews = await features.query;

    const newReviews = reviews.map((value: unknown) => {
      const review = JSON.parse(JSON.stringify(value));
      return { ...review, id: review._id };
    });

    res.status(200).json(newReviews);
  }
);

const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json(review);
  }
);

export { getAllReviews, getReview };
