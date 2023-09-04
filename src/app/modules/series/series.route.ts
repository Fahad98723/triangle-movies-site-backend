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

router.get('/:id', SeriesController.getSingleSeries);
router.patch(
  '/:id',
  ValidateRequest(SeriesValidation.updateSeriesZodSchema),
  SeriesController.updateSeries,
);
router.delete('/:id', SeriesController.deleteSeries);
router.get('/', SeriesController.getAllSeries);
export const SeriesRoutes = router;
