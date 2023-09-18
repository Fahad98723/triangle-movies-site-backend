import { Model } from 'mongoose';

export type IMovie = {
  movieid: string;
  title: string;
  overview: string;
  release_date: string;
  release_year: string;
  link: string;
  genres: [
    | 'Action'
    | 'Adventure'
    | 'Animation'
    | 'Comedy'
    | 'Crime'
    | 'Drama'
    | 'Fantasy'
    | 'Horror'
    | 'Mystery'
    | 'Romance'
    | 'Sci-Fi'
    | 'Thriller'
    | 'War'
    | 'Western'
    | 'Documentary'
    | 'Reality'
    | 'Talk Show'
    | 'Sitcom'
    | 'Superhero'
    | 'Historical'
    | 'Family'
    | 'Music',
  ]; // Array of genre names
  categories: string[];
  runtime: string; // Duration in minutes
  poster: string; // URL to the poster image
  cast: string[]; // Array of cast member names,
  screenshots: string[];
  director: string;
  average_rating: number;
  trailer: string; // URL to the official trailer
  production_companies: string[]; // Array of production company names
  production_countries: string[]; // Array of production country names
};

export type MovieModel = Model<IMovie, Record<string, unknown>>;

export type IMoviesFilter = {
  searchName?: string;
};
