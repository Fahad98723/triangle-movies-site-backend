import { Schema, model } from 'mongoose';
import { ISeries, SeriesModel } from './series.interface';
import { AllGenre } from '../../../shared/allGenre';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const episodeSchema = new Schema({
  title: { type: String, required: true },
  overview: { type: String, required: true },
  air_date: { type: String, required: true }, // You might want to consider using Date type instead
  episode_number: { type: Number, required: true },
  episode_link: { type: Number, required: true },
});

const seasonSchema = new Schema({
  number: { type: Number, required: true },
  episodes: [episodeSchema],
});

const seriesSchema = new Schema(
  {
    seriesid: {
      type: String,
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    overview: { type: String, required: true },
    release_date: { type: String, required: true }, // You might want to consider using Date type instead
    release_year: { type: String, required: true }, // You might want to consider using Date type instead
    genres: { type: [String], required: true, enum: AllGenre },
    seasons: [seasonSchema],
    poster: { type: String, required: true },
    cast: [String],
    screenshots: [String],
    director: { type: String, required: true },
    average_rating: { type: Number, required: true },
    trailer: { type: String, required: true },
    production_companies: [String],
    production_countries: [String],
  },
  {
    timestamps: true,
  },
);

seriesSchema.pre('save', async function (next) {
  const isExist = await Series.findOne({
    title: this.title,
    release_date: this.release_date,
  });

  if (isExist) {
    throw new ApiError(httpStatus.CONFLICT, 'Series Already Exist');
  }
  next();
});

export const Series = model<ISeries, SeriesModel>('Series', seriesSchema);
