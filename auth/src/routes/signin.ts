import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error';

const Router = express.Router()

Router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('must provide a password')
], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  res.send('awyeah!')
})

export { Router as signinRouter }
