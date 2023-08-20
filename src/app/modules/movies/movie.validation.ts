import { z } from 'zod';
import { AllGenre } from '../../../shared/allGenre';
//req validation
const createMovieZodSchema = z.object({
  body: z.object({
    movie: z.object({
      title: z.string({
        required_error: 'Title is required',
      }),
      overview: z.string({
        required_error: 'Overview is required',
      }),
      release_date: z.string({
        required_error: 'Release date is required',
      }),
      genres: z.array(z.enum([...AllGenre] as [string, ...string[]]), {
        required_error: 'Genres are required',
        invalid_type_error: 'Genres is invalid',
      }),
      runtime: z.number({
        required_error: 'Runtime is required',
      }),
      poster: z.string({
        required_error: 'Poster URL is required',
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
        required_error: 'Trailer URL is required',
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

export const MovieValidation = {
  createMovieZodSchema,
};

// await createMovieZodSchema.parseAsync(req);
