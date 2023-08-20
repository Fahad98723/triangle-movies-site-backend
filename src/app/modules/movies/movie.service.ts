import ApiError from '../../../errors/ApiError';
import { IMovie } from './movie.intereface';
import { Movie } from './movie.model';
import { generatedMovieId } from './movie.utils';

const addMovie = async (movie: IMovie): Promise<IMovie | null> => {
  const movieId = await generatedMovieId();

  movie.movieid = movieId;

  const addedMovie = await Movie.create(movie);
  if (!addedMovie) {
    throw new ApiError(400, 'Failed to add Movie');
  }

  return addedMovie;
};

export const MovieService = {
  addMovie,
};
