import { Model, Schema, model } from 'mongoose';
import { IMovie } from './movies.intereface';

type MovieModel = Model<IMovie, object>;

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
    genres: { type: [String], required: true },
    runtime: { type: Number, required: true },
    poster: { type: String, required: true },
    cast: { type: [String], required: true },
    screenshots: { type: [String], required: true },
    director: { type: String, required: true },
    average_rating: { type: Number, required: true },
    trailer: { type: String, required: true },
    production_companies: { type: [String] },
    production_countries: { type: [String], required: true },
  },
  {
    timestamps: true,
  },
);

export const Movie = model<IMovie, MovieModel>('Movie', movieSchema);
