import { Series } from './series.model';

export const findLastSeriesId = async () => {
  const lastSeries = await Series.findOne({}, { seriesid: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return lastSeries?.seriesid;
};

export const generatedSeriesId = async () => {
  const currentSeriesId =
    (await findLastSeriesId()) || (0).toString().padStart(5, '0');
  //increment by 1
  const incrementedId = (parseInt(currentSeriesId) + 1)
    .toString()
    .padStart(5, '0');
  return incrementedId;
};
