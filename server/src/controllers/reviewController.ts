import { NextFunction, Request, Response } from 'express';
import Review from '../models/reviewModel';
import { APIFeatures } from '../utils/apiFeatures';
import AppError from '../utils/appError';
import { increaseBusinessHits } from '../utils/business/increaseBusinessHits';
import catchAsync from '../utils/catchAsync';

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

    const review = await features.query;

    res.status(200).json({
      status: 'success',
      documentCount: review.length,
      data: review,
    });
  }
);

const getReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: review,
    });
  }
);

const createReview = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const files = req.files as Express.Multer.File[] | undefined;

    const filePaths = files?.map((file) => file.path);

    req.body.images = filePaths;
    let newReview = await Review.create(req.body);
    newReview = await newReview.populate('author');

    // hit score depends on the rating
    increaseBusinessHits({
      businessId: req.body.business,
      hitScore: req.body.rating,
    });

    res.status(201).json({
      status: 'success',
      data: newReview,
    });
  }
);

const updateReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newReview = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!newReview) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: newReview,
    });
  }
);

const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({});
  }
);

const handleReviewLikes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const reviewId = req.params.id;
    const businessId = req.body.businessId;

    if (!businessId) {
      const error = new AppError('Business id is required', 400);
      return next(error);
    }

    if (!reviewId) {
      const error = new AppError('Review id is required', 400);
      return next(error);
    }

    // increaseBusinessHits(businessId, 'reply');

    await Review.findByIdAndUpdate(reviewId, {
      ...(req.body.type === 'increment' && {
        $inc: { 'likes.value': 1 },
        $addToSet: { 'likes.users': req.body.userId },
      }),
      ...(req.body.type === 'decrement' && {
        $inc: { 'likes.value': -1 },
        $pull: { 'likes.users': req.body.userId },
      }),
    });

    res.status(204).json({});
  }
);

export default {
  getAllReviews,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  handleReviewLikes,
};
