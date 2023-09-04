import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/errror';

const handleCastError = (error: mongoose.Error.CastError) => {
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = [
    {
      path: error.path,
      message: 'Invalid ID',
    },
  ];

  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
