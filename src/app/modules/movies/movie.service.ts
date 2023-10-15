import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IMovie, IMoviesFilter } from './movie.intereface';
import { Movie } from './movie.model';
import { generatedMovieId, generatedMovieUrl } from './movie.utils';
import { MoviesSearchableFields, capitalizeWords } from './movie.constant';
import { IPaginationOptions } from '../../../interfaces/pagination';

const addMovie = async (movie: IMovie): Promise<IMovie | null> => {
  const movieId = await generatedMovieId();
  const movieUrl = generatedMovieUrl(movie);
  movie.movieid = movieId;
  movie.url = movieUrl;

  const addedMovie = await Movie.create(movie);
  if (!addedMovie) {
    throw new ApiError(400, 'Failed to add Movie');
  }
  return addedMovie;
};

const getAllMovie = async (
  filters: IMoviesFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<IMovie[]>> => {
  const { searchName, ...filtersData } = filters;
  const andConditions = [];

  if (searchName) {
    andConditions.push({
      $or: MoviesSearchableFields.map(field => ({
        [field]: {
          $regex: searchName,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: typeof value === 'string' ? capitalizeWords(value) : value,
      })),
    });
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Movie.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const resultCount = Movie.find(whereCondition).sort(sortConditions);

  const total = await Movie.countDocuments();
  const count = await resultCount.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
      count,
    },
    data: result,
  };
};

const getSingleMovie = async (id: string): Promise<IMovie | null> => {
  const result = await Movie.findById(id);
  return result;
};

const getSingleMovieByUrl = async (url: string): Promise<IMovie | null> => {
  console.log(url);

  const result = await Movie.findOne({ url: url });
  return result;
};

const updateMovie = async (
  id: string,
  payload: IMovie,
): Promise<IMovie | null> => {
  if (payload && !payload?.url) {
    const movieUrl = generatedMovieUrl(payload);
    payload.url = movieUrl;
  }

  console.log(payload);

  const result = await Movie.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteMovie = async (id: string) => {
  const result = await Movie.findByIdAndDelete(id);
  return result;
};

export const MovieService = {
  addMovie,
  getAllMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
  getSingleMovieByUrl,
};
