import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorMessage } from '../interfaces/errror';

const handleZodError = (error: ZodError) => {
  const statusCode = 400;
  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[
        typeof issue?.path[issue.path.length - 1] === 'string'
          ? issue.path.length - 1
          : issue.path.length - 2
      ],
      message: issue?.message,
    };
  });

  console.log(
    error.issues.map((issue: ZodIssue) => issue.path),
    errors,
  );

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
