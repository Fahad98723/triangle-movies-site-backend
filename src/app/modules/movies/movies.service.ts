import { IMovie } from './movies.intereface';
import { Movie } from './movies.model';
import { generatedMovieId } from './movies.utils';

const addMovie = async (movie: IMovie): Promise<IMovie | null> => {
  const movieId = await generatedMovieId();

  movie.movieid = movieId;

  const addedMovie = await Movie.create(movie);
  if (!addedMovie) {
    throw new Error('Failed to add Movie');
  }

  return addedMovie;
};

export default {
  addMovie,
};
