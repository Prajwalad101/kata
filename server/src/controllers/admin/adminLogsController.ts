import { NextFunction, Response, Request } from 'express';
import Logger from '../../models/loggerModel';
import { APIFeatures } from '../../utils/apiFeatures';
import catchAsync from '../../utils/catchAsync';

const getLogs = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const logsQuery = Logger.find();

    if (req.query._end && req.query._start) {
      req.query.limit = String(
        Number(req.query._end) - Number(req.query._start)
      );
      req.query.skip = req.query._start;

      // delete original query params
      delete req.query._end;
      delete req.query._start;
    }

    const apiFeatures = new APIFeatures(logsQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const logs = await apiFeatures.query;

    const newLogs = logs.map((value: unknown) => {
      const log = JSON.parse(JSON.stringify(value));
      return { ...log, id: log._id };
    });

    res.json(newLogs);
  }
);

export { getLogs };
