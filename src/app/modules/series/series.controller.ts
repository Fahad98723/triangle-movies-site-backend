import { NextFunction, Request, Response } from 'express';
import { SeriesService } from './series.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';

const addSeries = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { series } = req.body;
    const result = await SeriesService.addSeries(series);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'series added successfully',
      data: result,
    });
    next();
  },
);

export const SeriesController = {
  addSeries,
};
