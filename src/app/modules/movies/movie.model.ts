import { Schema, model } from 'mongoose';
import { IMovie, MovieModel } from './movie.intereface';
import { AllGenre } from '../../../shared/allGenre';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const movieSchema = new Schema<IMovie>(
  {
    movieid: {
      type: String,
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: { type: String, required: true },
    release_year: { type: String, required: true },
    link: { type: String, required: true },
    genres: { type: [String], required: true, enum: AllGenre },
    categories: { type: [String], required: true },
    runtime: { type: String, required: true },
    poster: { type: String, required: true },
    cast: { type: [String], required: true },
    screenshots: { type: [String], required: true },
    director: { type: String, required: true },
    average_rating: { type: Number, required: true },
    trailer: { type: String, required: true },
    production_companies: { type: [String], required: true },
    production_countries: { type: [String], required: true },
  },
  {
    timestamps: true,
  },
);

movieSchema.pre('save', async function (next) {
  const isExist = await Movie.findOne({
    title: this.title,
    release_date: this.release_date,
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Movie Already Exist');
  }
  next();
});

export const Movie = model<IMovie, MovieModel>('Movie', movieSchema);
