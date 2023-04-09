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

    req.query.fields = 'review,rating,likes,dislikes,author';

    const features = new APIFeatures(reviewQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const reviews = await features.query;

    const newReviews = reviews.map((value: unknown) => {
      const review = JSON.parse(JSON.stringify(value));
      console.log('REVIEW', review);
      return {
        data: review.review,
        user: review.author.userName,
        likes: review.likes.value,
        dislikes: review.dislikes,
        rating: review.rating,
        id: review._id,
      };
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

    let newReview = JSON.parse(JSON.stringify(review));
    newReview = {
      data: JSON.parse(JSON.stringify(newReview.review)),
      ...newReview,
    };

    delete newReview.review;

    res.status(200).json(newReview);
  }
);

const deleteReview = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
    });
  }
);

export { getAllReviews, getReview, deleteReview };
