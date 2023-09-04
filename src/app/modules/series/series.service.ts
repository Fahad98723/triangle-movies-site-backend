import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { ISeries, ISeriesFilter } from './series.interface';
import { Series } from './series.model';
import { generatedSeriesId } from './series.utils';
import { seriesSearchableFields } from './series.constant';

const addSeries = async (series: ISeries): Promise<ISeries> => {
  const serisId = await generatedSeriesId();
  series.seriesid = serisId;

  const result = await Series.create(series);
  return result;
};

const getAllSeries = async (
  filters: ISeriesFilter,
  paginationOptions: IPaginationOptions,
): Promise<IGenericResponse<ISeries[]>> => {
  const { searchName, ...filtersData } = filters;

  const andConditions = [];

  if (searchName) {
    andConditions.push({
      $or: seriesSearchableFields.map(field => ({
        [field]: { $regex: searchName, $options: 'i' },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: searchName,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         release_date: {
  //           $regex: searchName,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Series.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await Series.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSeries = async (id: string): Promise<ISeries | null> => {
  const result = await Series.findById(id);
  return result;
};

const updateSeries = async (
  id: string,
  payload: ISeries,
): Promise<ISeries | null> => {
  const result = await Series.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSeries = async (id: string) => {
  const result = await Series.findByIdAndDelete(id);
  return result;
};

export const SeriesService = {
  addSeries,
  getAllSeries,
  getSingleSeries,
  updateSeries,
  deleteSeries,
};
