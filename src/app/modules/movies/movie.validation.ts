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
      link: z.string({
        required_error: 'Link is required',
      }),
      release_date: z.string({
        required_error: 'Release date is required',
      }),
      release_year: z.string({
        required_error: 'Release Year is required',
      }),
      genres: z.array(z.enum([...AllGenre] as [string, ...string[]]), {
        required_error: 'Genres are required',
        invalid_type_error: 'Genres is invalid',
      }),
      runtime: z.string({
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
      categories: z.array(
        z.string({
          required_error: 'Categories are required',
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

const updateMovieZodSchema = z.object({
  body: z.object({
    movie: z.object({
      title: z
        .string({
          required_error: 'Title is required',
        })
        .optional(),
      link: z
        .string({
          required_error: 'Link is required',
        })
        .optional(),

      overview: z
        .string({
          required_error: 'Overview is required',
        })
        .optional(),
      release_date: z
        .string({
          required_error: 'Release date is required',
        })
        .optional(),
      release_year: z
        .string({
          required_error: 'Release Year is required',
        })
        .optional(),
      genres: z
        .array(z.enum([...AllGenre] as [string, ...string[]]), {
          required_error: 'Genres are required',
          invalid_type_error: 'Genres is invalid',
        })
        .optional(),
      runtime: z
        .string({
          required_error: 'Runtime is required',
        })
        .optional(),
      poster: z
        .string({
          required_error: 'Poster URL is required',
        })
        .optional(),
      cast: z
        .array(
          z.string({
            required_error: 'Cast members are required',
          }),
        )
        .optional(),
      categories: z
        .array(
          z.string({
            required_error: 'Categories are required',
          }),
        )
        .optional(),
      screenshots: z
        .array(
          z.string({
            required_error: 'Screenshots are required',
          }),
        )
        .optional(),
      director: z
        .string({
          required_error: 'Director is required',
        })
        .optional(),
      average_rating: z
        .number({
          required_error: 'Average rating is required',
        })
        .optional(),
      trailer: z
        .string({
          required_error: 'Trailer URL is required',
        })
        .optional(),
      production_companies: z.array(z.string()).optional(),
      production_countries: z
        .array(
          z.string({
            required_error: 'Production countries are required',
          }),
        )
        .optional(),
    }),
  }),
});

export const MovieValidation = {
  createMovieZodSchema,
  updateMovieZodSchema,
};

// await createMovieZodSchema.parseAsync(req);
