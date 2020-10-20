import { NextFunction, Request, Response } from 'express';
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof RequestValidationError) {
    console.log('validation error')
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }
  if (err instanceof DatabaseConnectionError) {
    console.log('database error')
    return res.status(err.statusCode).send({ errors: err.serializeErrors() })
  }

  const errorFallbackFormatted = [{ message: 'something went wrong' }]
  res.status(400).send({ errors: errorFallbackFormatted })
}
