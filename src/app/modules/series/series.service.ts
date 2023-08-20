import { ISeries } from './series.interface';
import { Series } from './series.model';
import { generatedSeriesId } from './series.utils';

const addSeries = async (series: ISeries): Promise<ISeries> => {
  const serisId = await generatedSeriesId();
  series.seriesid = serisId;

  const result = await Series.create(series);
  return result;
};

export const SeriesService = {
  addSeries,
};
