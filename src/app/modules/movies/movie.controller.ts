import { Request, Response } from 'express';
import { MovieService } from './movie.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { MoviesFilterableFields } from './movie.constant';
import { paginationFields } from '../../../constant/pagination';
import { IMovie } from './movie.intereface';

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

const getAllMovie = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, MoviesFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await MovieService.getAllMovie(filters, paginationOptions);

  sendResponse<IMovie[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie retrived successfully',
    data: result.data,
    meta: result.meta,
  });
});

const getSingleMovie = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await MovieService.getSingleMovie(id);

  sendResponse<IMovie>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie retrived successfully',
    data: result,
  });
});

const updateMovie = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body.movie;

  console.log(id, updateMovie);

  const result = await MovieService.updateMovie(id, updatedData);

  sendResponse<IMovie>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie Update successfully',
    data: result,
  });
});

const deleteMovie = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await MovieService.deleteMovie(id);

  sendResponse<IMovie>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Movie deleted successfully',
    data: result,
  });
});

export const MovieController = {
  addMovie,
  getAllMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
};
