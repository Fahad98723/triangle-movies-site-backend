export type IMovie = {
  movieid: string;
  title: string;
  overview: string;
  release_date: string;
  genres: string[]; // Array of genre names
  runtime: number; // Duration in minutes
  poster: string; // URL to the poster image
  cast: string[]; // Array of cast member names,
  screenshots: string[];
  director: string;
  average_rating: number;
  trailer: string; // URL to the official trailer
  production_companies?: string[]; // Array of production company names
  production_countries: string[]; // Array of production country names
};
