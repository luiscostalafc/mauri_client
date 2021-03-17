/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable consistent-return */
import { Schema, ValidationError } from 'yup';

interface Errors {
  [key: string]: string;
}

function getValidationErrors(err: ValidationError): Errors {
  const validationErrors: Errors = {};

  err.inner.forEach(error => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}

export async function validateForm(schema: Schema<any>, data: any) {
  try {
    await schema.validate(data, {
      abortEarly: false,
    });
    return false;
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = getValidationErrors(error);
      return errors;
    }
  }
}
