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
  episode_link: { type: String, required: true },
});

const zipfile = new Schema({
  caption: { type: String, required: true },
  link: {
    type: String,
  },
});

const seasonSchema = new Schema({
  number: { type: Number, required: true },
  episodes: [episodeSchema],
  zipfile: { type: [zipfile], _id: false },
});

seasonSchema.pre('validate', function (next) {
  const hasEpisodes = this.episodes && this.episodes.length > 0;
  const hasZipfile = this.zipfile && this.zipfile.length > 0;

  if (!hasEpisodes && !hasZipfile) {
    return next(new Error('Either episodes or zipfile must be provided.'));
  }
  next();
});

const seriesSchema = new Schema(
  {
    seriesid: {
      type: String,
      required: true,
      unique: true,
    },
    title: { type: String, required: true },
    url: { type: String, unique: true },
    overview: { type: String, required: true },
    release_date: { type: String, required: true }, // You might want to consider using Date type instead
    release_year: { type: String, required: true }, // You might want to consider using Date type instead
    genres: {
      type: [String],
      validate: {
        validator: function (array: string[]) {
          return array && array.length > 0;
        },
        message: 'At least one Genres is required.',
      },
      enum: AllGenre,
    },
    seasons: {
      type: [seasonSchema],
      validate: {
        validator: function (value: object) {
          return Object.keys(value).length > 0; // Check if the seasons array is not empty
        },
        message: 'At least one season is required.',
      },
    },
    poster: { type: String, required: true },
    cast: {
      type: [String],
    },
    screenshots: [String],
    director: {
      type: [String],
      validate: {
        validator: function (array: string[]) {
          return array && array.length > 0;
        },
        message: 'At least one director  is required.',
      },
    },
    average_rating: { type: Number, required: true },
    trailer: { type: String, required: true },
    production_companies: {
      type: [String],
      validate: {
        validator: function (array: string[]) {
          return array && array.length > 0;
        },
        message: 'At least one production company is required.',
      },
    },
    production_countries: {
      type: [String],
      validate: {
        validator: function (array: string[]) {
          return array && array.length > 0;
        },
        message: 'At least one production country is required.',
      },
    },
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
