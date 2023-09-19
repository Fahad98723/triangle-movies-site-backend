import { IMovie } from './movie.intereface';
import { Movie } from './movie.model';

export const findLastMovieId = async () => {
  const lastMovie = await Movie.findOne({}, { movieid: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastMovie?.movieid;
};

export const generatedMovieId = async () => {
  const currentMovieId =
    (await findLastMovieId()) || (0).toString().padStart(5, '0');
  //increment by 1
  const incrementedId = (parseInt(currentMovieId) + 1)
    .toString()
    .padStart(5, '0');
  return incrementedId;
};

export const generatedMovieUrl = async (movie: IMovie) => {
  const movieUrl = `${movie?.title + ' ' + movie?.release_year}`
    .trim()
    .toLowerCase()
    .replaceAll(' ', '-')
    .replace(/&/g, 'and')
    .replaceAll('?', '-')
    .replaceAll('+', '%2B')
    .replaceAll('/', '-or-');
  return movieUrl;
};
