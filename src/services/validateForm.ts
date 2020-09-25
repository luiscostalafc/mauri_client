
import getValidationErrors from '../utils/getValidationErrors'
import { ValidationError, Schema } from 'yup'

export async function validateForm (schema: Schema<any>, data: any) {
  try {
    await schema.validate(data, {
      abortEarly: false,
    })
    return {}
  } catch (error) {
    if (error instanceof ValidationError) {
      const errors = getValidationErrors(error) 
      return errors
    }
  }
}
