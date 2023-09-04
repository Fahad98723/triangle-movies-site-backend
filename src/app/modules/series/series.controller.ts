import { Request, Response } from 'express';
import { SeriesService } from './series.service';
import catchAsync from '../../../shared/catchAsync';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import { ISeries } from './series.interface';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { seriesFilterableFields } from './series.constant';

const addSeries = catchAsync(async (req: Request, res: Response) => {
  const { series } = req.body;
  const result = await SeriesService.addSeries(series);

  sendResponse<ISeries>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'series added successfully',
    data: result,
  });
});

const getAllSeries = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, seriesFilterableFields);

  const paginationOptions = pick(req.query, paginationFields);
  const result = await SeriesService.getAllSeries(filters, paginationOptions);

  sendResponse<ISeries[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'series retrived successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleSeries = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SeriesService.getSingleSeries(id);

  sendResponse<ISeries>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Series retrived successfully',
    data: result,
  });
});

const updateSeries = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body.series;

  const result = await SeriesService.updateSeries(id, updatedData);

  sendResponse<ISeries>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Series updated successfully',
    data: result,
  });
});

const deleteSeries = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await SeriesService.deleteSeries(id);

  sendResponse<ISeries>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Series deleted successfully',
    data: result,
  });
});

export const SeriesController = {
  addSeries,
  getAllSeries,
  getSingleSeries,
  updateSeries,
  deleteSeries,
};
