import express from 'express';
import ValidateRequest from '../../middlewares/validateRequest';
import { SeriesValidation } from './series.validation';
import { SeriesController } from './series.controller';

const router = express.Router();

router.post(
  '/add-series',
  ValidateRequest(SeriesValidation.createSeriesZodSchema),
  SeriesController.addSeries,
);

export const SeriesRoutes = router;
