import { isString } from '@destiny/common/utils';
import { NextFunction, Request, Response } from 'express';
import BusinessHits from '../models/businessHits';
import Business from '../models/businessModel';
import { APIFeatures } from '../utils/apiFeatures';
import AppError from '../utils/appError';
import { increaseBusinessHits } from '../utils/business/increaseBusinessHits';
import { filterFeatures } from '../utils/businessFunc';
import catchAsync from '../utils/catchAsync';

export const getTrendingBusinesses = catchAsync(
  async (_req: Request, res: Response, _next: NextFunction) => {
    const businesses = await BusinessHits.aggregate([
      // Stage 1: Get last week business hits
      {
        $match: {
          timestamp: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      // Stage 2: Group Businesses and get total hit score
      {
        $group: {
          _id: '$metadata.businessId',
          totalHitScore: {
            $sum: '$hitScore',
          },
        },
      },
      // Stage 3: Sort based on total hit score
      { $sort: { totalHitScore: -1, _id: 1 } },
      // Stage 4: Populate businesses
      {
        $lookup: {
          from: 'businesses',
          localField: '_id',
          foreignField: '_id',
          as: 'business',
        },
      },
      // Stage 5: set business object as the root field
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ['$business', 0] }, '$$ROOT'],
          },
        },
      },
      // Stage 6: exclude nested business field
      { $project: { business: 0 } },
    ]);

    res.json({ status: 'success', data: businesses });
  }
);

const getAllBusinesses = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const businessQuery = Business.find();
    const defaultFields = [
      'name',
      'location',
      'images',
      'ratings',
      'workingDays',
    ];
    req.query.fields = defaultFields.join(',');

    // filter documents by "features" field
    if (isString(req.query.features)) {
      filterFeatures(businessQuery, req.query.features);
    }

    businessQuery.populate({
      path: 'reviews',
      select: 'review -business',
      perDocumentLimit: 2,
      options: { sort: { likes: -1, createdAt: -1 } },
    });

    const apiFeatures = new APIFeatures(businessQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const allBusiness = await apiFeatures.query;

    res.json({
      status: 'success',
      documentCount: allBusiness.length,
      page: Number(req.query.page) || 1,
      data: allBusiness,
    });
  }
);

const createBusiness = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const files = req.files as Express.Multer.File[] | undefined;

    const filePaths = files?.map((file) => file.path);

    // add images paths to the request body
    req.body.images = filePaths;

    const business = await Business.create(req.body);
    res.status(201).json({
      status: 'success',
      data: business,
    });
  }
);

const getBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const business = await Business.findById(req.params.id);
    increaseBusinessHits({ businessId: req.params.id, hitScore: 2 });

    if (!business) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: business,
    });
  }
);

const updateBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const business = await Business.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!business) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: business,
    });
  }
);

const deleteBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const business = await Business.findByIdAndDelete(req.params.id);

    if (!business) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
    });
  }
);

const searchBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const searchString = req.query.text;

    if (typeof searchString !== 'string') {
      const error = new AppError('search text must be of type string', 400);
      return next(error);
    }

    const businessesQuery = Business.find(
      { $text: { $search: searchString } },
      { score: { $meta: 'textScore' } }
    );

    businessesQuery.sort({ score: { $meta: 'textScore' } });
    businessesQuery.select(['name', 'location.address', 'category']);

    const businesses = await businessesQuery;

    res.status(200).json({
      status: 'success',
      documentCount: businesses.length,
      data: businesses,
    });
  }
);

export default {
  getAllBusinesses,
  getBusiness,
  createBusiness,
  updateBusiness,
  deleteBusiness,
  searchBusiness,
};
