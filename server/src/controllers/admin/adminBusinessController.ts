import { NextFunction, Response } from 'express';
import Request from 'mailgun.js/request';
import Business from '../../models/businessModel';
import catchAsync from '../../utils/catchAsync';

const getAllBusinesses = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const businessQuery = Business.find();

    const defaultFields = [
      'name',
      'city',
      'contactNumber',
      'email',
      'category',
      'website',
      'verified',
    ];

    req.query.fields = defaultFields.join(',');

    if (req.query._end && req.query._start) {
      req.query.limit = String(
        Number(req.query._end) - Number(req.query._start)
      );
      req.query.skip = req.query._start;

      // delete original query params
      delete req.query._end;
      delete req.query._start;
    }

    delete req.query._end;
    delete req.query._start;

    const apiFeatures = new APIFeatures(businessQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    let allBusiness = await apiFeatures.query;

    allBusiness = allBusiness.map((business: any) => {
      const newBusiness = JSON.parse(JSON.stringify(business));
      delete newBusiness._id;
      newBusiness.verified = String(newBusiness.verified);
      return newBusiness;
    });

    res.json(allBusiness);
  }
);

export { getAllBusinesses };
