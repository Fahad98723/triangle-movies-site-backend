import { Model } from 'mongoose';
import { Season } from '../../../interfaces/season';

export type ISeries = {
  title: string;
  seriesid: string;
  overview: string;
  release_date: string; // Required, format: "YYYY-MM-DD"
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
  ]; // Array of genre names // Array of genre names
  seasons: Season[]; // Array of season objects
  poster: string; // URL to the poster image
  cast: string[]; // Array of cast member names
  screenshots: string[];
  director: string;
  average_rating: number;
  trailer: string; // URL to the official trailer
  production_companies?: string[]; // Array of production company names
  production_countries: string[]; //
};

export type SeriesModel = Model<ISeries, object>;

export type ISeriesFilter = {
  searchName?: string;
};
