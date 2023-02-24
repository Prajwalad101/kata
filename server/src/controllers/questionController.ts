import { NextFunction, Request, Response } from 'express';
import Question from '../models/questionModel';
import { APIFeatures } from '../utils/apiFeatures';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

export const getAllQuestions = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const questionQuery = Question.find();

    questionQuery.populate({
      path: 'author',
    });

    const features = new APIFeatures(questionQuery, req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const questions = await features.query;

    res.status(200).json({
      status: 'success',
      documentCount: questions.length,
      data: questions,
    });
  }
);

export const getQuestion = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: question,
    });
  }
);

export const createQuestion = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let newQuestion = await Question.create(req.body);
    newQuestion = await newQuestion.populate('author');

    res.status(201).json({
      status: 'success',
      data: newQuestion,
    });
  }
);

export const createReply = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    const newReply = await Question.findByIdAndUpdate(
      req.body.id,
      {
        $push: {
          reply: { author: req.body.author, reply: req.body.reply },
        },
      },
      { new: true }
    );

    res.status(201).json({
      status: 'success',
      data: newReply,
    });
  }
);
