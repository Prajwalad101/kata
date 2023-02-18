import { NextFunction, Request, Response } from "express";
import Question from "../models/questionModel";
import { APIFeatures } from "../utils/apiFeatures";
import catchAsync from "../utils/catchAsync";

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

export const createQuestion = catchAsync(
  async (req: Request, res: Response, _next: NextFunction) => {
    let newQuestion = await Question.create(req.body);
    newQuestion = await newQuestion.populate('author')


    res.status(201).json({
      status: 'success',
      data: newQuestion,
    });
  }
);
