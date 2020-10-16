import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { DatabaseConnectionError } from '../errors/database-connection-error'
import { RequestValidationError } from '../errors/request-validation-error'

const Router = express.Router()

Router.post('/api/users/signup', [
  body('email').isEmail().withMessage('email must be valid'),
  body('password').trim().isLength({ min: 5, max: 20 }).withMessage('password must be at least 5 characters')
], (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  throw new DatabaseConnectionError()

  const { email, password } = req.body
  res.send(`creating user ${email}, ${password}`)
})

export { Router as signupRouter }
