import express from 'express';
import moviesController from './movies.controller';

const router = express.Router();

router.post('/add-movie', moviesController.addMovie);

export default {
  router,
};
