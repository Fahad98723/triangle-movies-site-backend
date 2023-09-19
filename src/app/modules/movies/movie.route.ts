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
router.get('/', MovieController.getAllMovie);
router.get('/:id', MovieController.getSingleMovie);
router.get('/url/:url', MovieController.getSingleMovieByUrl);
router.patch('/:id', MovieController.updateMovie);
router.delete('/:id', MovieController.deleteMovie);

export const MovieRoutes = router;
