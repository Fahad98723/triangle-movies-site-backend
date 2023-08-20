import express from 'express';
import { MovieController } from './movie.controller';
import { MovieValidation } from './movie.validation';
import ValidateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/add-movie',
  ValidateRequest(MovieValidation.createMovieZodSchema),
  MovieController.addMovie,
);

export const MovieRoutes = router;
