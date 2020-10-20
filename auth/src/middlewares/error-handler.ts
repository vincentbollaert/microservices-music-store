import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof RequestValidationError) {
    const errorsFormatted = {
      errors: err.errors.map(x => ({
        message: x.msg,
        field: x.param,
      }))
    }

    console.log('validation error')
    return res.status(400).send(errorsFormatted)
  }
  if (err instanceof DatabaseConnectionError) {
    const errorsFormatted = {
      errors: [
        {
          message: err.errorMessage
        }
      ]
    }
    console.log('database error')
    return res.status(500).send(errorsFormatted)
  }

  const errorFallbackFormatted = {
    errors: [
      {
        message: 'something went wrong'
      }
    ]
  }
  res.status(400).send(errorFallbackFormatted)
}
