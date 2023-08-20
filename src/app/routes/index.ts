import express from 'express';
import { MovieRoutes } from '../modules/movies/movie.route';
import { SeriesRoutes } from '../modules/series/series.route';

const router = express.Router();

const moduleRoutes = [
  { path: '/movies', route: MovieRoutes },
  {
    path: '/series',
    route: SeriesRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

//Application routes

export default router;
