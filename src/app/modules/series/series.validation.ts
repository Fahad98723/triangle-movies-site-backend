import { z } from 'zod';
import { AllGenre } from '../../../shared/allGenre';
//req validation

const EpisodeSchema = z.object({
  title: z.string({
    required_error: 'Episode title is required',
  }),
  overview: z.string({
    required_error: 'Episode overview is required',
  }),
  air_date: z.string({
    required_error: 'Episode air date is required',
  }),
  episode_number: z.number({
    required_error: 'Episode number is required',
  }),
});

const SeasonSchema = z.object({
  number: z.number({
    required_error: 'Season number is required',
  }),
  episodes: z.array(EpisodeSchema, {
    required_error: 'Episodes are required',
  }),
});

const createSeriesZodSchema = z.object({
  body: z.object({
    series: z.object({
      title: z.string({
        required_error: 'Series title is required',
      }),
      overview: z.string({
        required_error: 'Series overview is required',
      }),
      release_date: z.string({
        required_error: 'Series release date is required',
      }),
      genres: z.array(z.enum([...AllGenre] as [string, ...string[]]), {
        required_error: 'Genres are required',
        invalid_type_error: 'Genres is invalid',
      }),
      seasons: z.array(SeasonSchema, {
        required_error: 'Seasons are required',
      }),
      poster: z.string({
        required_error: 'Series poster URL is required',
      }),
      cast: z.array(
        z.string({
          required_error: 'Cast members are required',
        }),
      ),
      screenshots: z.array(
        z.string({
          required_error: 'Screenshots are required',
        }),
      ),
      director: z.string({
        required_error: 'Director is required',
      }),
      average_rating: z.number({
        required_error: 'Average rating is required',
      }),
      trailer: z.string({
        required_error: 'Series trailer URL is required',
      }),
      production_companies: z.array(z.string()),
      production_countries: z.array(
        z.string({
          required_error: 'Production countries are required',
        }),
      ),
    }),
  }),
});

export const SeriesValidation = {
  createSeriesZodSchema,
};
