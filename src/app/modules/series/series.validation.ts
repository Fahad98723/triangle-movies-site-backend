import { z } from 'zod';
import { AllGenre } from '../../../shared/allGenre';
import { Season } from '../../../interfaces/season';
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
  episode_link: z.string({
    required_error: 'Episode link is required',
  }),
});

const ZipFileSchema = z.object({
  caption: z.string({}),
  link: z.string({}),
});

const SeasonSchema = z.object({
  number: z.number({
    required_error: 'Season number is required',
  }),
  episodes: z.array(EpisodeSchema).optional(),
  zipfile: z.array(ZipFileSchema).optional(),
});

// Custom pre-validation function for SeasonSchema
export function preValidateSeasonSchema(data: Season) {
  console.log(data);

  const hasEpisodes = data.episodes && data.episodes.length > 0;
  const hasZipfile = data.zipfile && data.zipfile.length > 0;

  if (!hasEpisodes && !hasZipfile) {
    throw new Error('Either episodes or zipfiles must be provided.');
  }
}

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
      release_year: z.string({
        required_error: 'Series release date is required',
      }),
      genres: z
        .array(z.enum([...AllGenre] as [string, ...string[]]), {
          required_error: 'Genres are required',
          invalid_type_error: 'Genres is invalid',
        })
        .min(1, 'At least one genres is required.'),
      seasons: z
        .array(SeasonSchema, {
          required_error: 'Seasons are required',
        })
        .min(1, 'At least one season is required.'),
      poster: z.string({
        required_error: 'Series poster URL is required',
      }),
      cast: z.array(z.string()),
      screenshots: z.array(
        z.string({
          required_error: 'Screenshots are required',
        }),
      ),
      director: z
        .array(
          z.string({
            required_error: 'Production countries are required',
          }),
        )
        .min(1, 'At least one Director countries is required.'),
      average_rating: z.number({
        required_error: 'Average rating is required',
      }),
      trailer: z.string({
        required_error: 'Series trailer URL is required',
      }),
      production_companies: z
        .array(z.string())
        .min(1, 'At least one production company is required.'),
      production_countries: z
        .array(
          z.string({
            required_error: 'Production countries are required',
          }),
        )
        .min(1, 'At least one production countries is required.'),
    }),
  }),
});
const updateSeriesZodSchema = z.object({
  body: z.object({
    series: z.object({
      title: z
        .string({
          required_error: 'Series title is required',
        })
        .optional(),
      overview: z
        .string({
          required_error: 'Series overview is required',
        })
        .optional(),
      release_date: z
        .string({
          required_error: 'Series release date is required',
        })
        .optional(),
      release_year: z
        .string({
          required_error: 'Series release year is required',
        })
        .optional(),
      genres: z
        .array(z.enum([...AllGenre] as [string, ...string[]]), {
          required_error: 'Genres are required',
          invalid_type_error: 'Genres is invalid',
        })
        .optional(),
      seasons: z
        .array(SeasonSchema, {
          required_error: 'Seasons are required',
        })
        .optional(),
      poster: z
        .string({
          required_error: 'Series poster URL is required',
        })
        .optional(),
      cast: z
        .array(
          z.string({
            required_error: 'Cast members are required',
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
          required_error: 'Series trailer URL is required',
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

export const SeriesValidation = {
  createSeriesZodSchema,
  updateSeriesZodSchema,
};
