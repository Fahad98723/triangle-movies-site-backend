import { Request, Response } from 'express';
import { MovieService } from './movie.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';

const addMovie = catchAsync(async (req: Request, res: Response) => {
  const { movie } = req.body;
  const result = await MovieService.addMovie(movie);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie added successfully',
    data: result,
  });
});

export const MovieController = {
  addMovie,
};
