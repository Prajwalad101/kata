import { NextFunction, Request, Response } from 'express';
import Logger from '../models/loggerModel';

export function reqResLoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // store reference to original json function
  const oldJsonCb = res.json;

  res.json = function (data) {
    res.contentBody = data;
    res.json = oldJsonCb; // call original res.json function
    return res.json(data);
  };

  res.on('finish', async () => {
    const status = res.statusCode;
    // don't log get requests
    if (req.method === 'GET') return;
    const user = req.user as any;

    await Logger.create({
      method: req.method,
      endpoint: req.originalUrl,
      status,
      request: req.body,
      response: res.contentBody,
      userAgent: req.headers['user-agent'],
      referrer: req.headers.referer || '',
      // ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      ip: req.ip,
      user: user?._id,
    });
  });

  next();
}
