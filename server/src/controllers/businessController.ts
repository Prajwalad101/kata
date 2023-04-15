import { IUser } from '@destiny/common/types/IUser';
import { isString } from '@destiny/common/utils';
import { NextFunction, Request, Response } from 'express';
import BusinessHits from '../models/businessHits';
import Business from '../models/businessModel';
import { APIFeatures } from '../utils/apiFeatures';
import AppError from '../utils/appError';
import { increaseBusinessHits } from '../utils/business/increaseBusinessHits';
import { filterFeatures } from '../utils/businessFunc';
import catchAsync from '../utils/catchAsync';
import { uploadToCloud } from '../utils/uploadToCloud';

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
      {
        $match: {
          verified: true,
        },
      },
      // Stage 6: exclude nested business field
      { $project: { business: 0 } },
    ]);

    // only send business that are populated
    const filteredBusinesses = businesses.filter((business) => {
      const keys = Object.keys(business);
      if (keys.length > 2) return true;
      return false;
    });

    res.json({
      status: 'success',
      documentCount: businesses.length,
      data: filteredBusinesses,
    });
  }
);

export const getNearestBusinesses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const coordinates = req.query.coordinates;

    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      const error = new AppError('Invalid coordinates', 400);
      return next(error);
    }

    const businesses = await Business.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [Number(coordinates[0]), Number(coordinates[1])],
          },
          spherical: true,
          maxDistance: 5 * 1000, // 5 km
          distanceField: 'calcDistance',
        },
      },
      { $match: { verified: true } },
    ]);

    res.json({
      status: 'success',
      documentCount: businesses.length,
      data: businesses,
    });
  }
);

export const getHighestRatedBusinesses = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const coordinates = req.query.coordinates;

    if (!Array.isArray(coordinates) || coordinates.length !== 2) {
      const error = new AppError('Invalid coordinates', 400);
      return next(error);
    }

    const businesses = await Business.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [Number(coordinates[0]), Number(coordinates[1])],
          },
          spherical: true,
          maxDistance: 20 * 1000, // 5 km
          distanceField: 'calcDistance',
        },
      },
      {
        $match: {
          verified: true,
          ratingCount: { $gt: 10 },
          avgRating: { $gt: 4.5 },
        },
      },
      {
        $sort: {
          avgRating: -1,
          ratingCount: -1,
        },
      },
    ]);

    res.json({
      status: 'success',
      documentCount: businesses.length,
      data: businesses,
    });
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
      'avgRating',
      'totalRoting',
      'ratingCount',
    ];
    req.query.fields = defaultFields.join(',');

    // filter documents by "features" field
    if (isString(req.query.features)) {
      filterFeatures(businessQuery, req.query.features);
    }

    const coordinates = req.query.coordinates;
    if (coordinates) {
      businessQuery.find({
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates,
            },
          },
        },
      });
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
    const user = req.user as IUser;

    const files = req.files as Express.Multer.File[] | undefined;

    const fileData = files?.map(({ filename, path }) => ({
      path,
      name: filename,
    }));

    let images: string[] = [];
    if (fileData) {
      images = await uploadToCloud({ files: fileData, folder: 'businesses' });
    }

    const business = await Business.create({
      ...req.body,
      images,
      owner: user._id,
    });

    res.status(201).json({
      status: 'success',
      data: business,
    });
  }
);

const getBusiness = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const business = await Business.findById(req.params.id);

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
      { $text: { $search: searchString }, verified: true },
      { score: { $meta: 'textScore' } }
    );

    businessesQuery.limit(5);
    businessesQuery.sort({ score: { $meta: 'textScore' }, _id: -1 });
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
