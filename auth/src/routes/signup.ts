import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { RequestValidationError } from '../errors/request-validation-error'
import { UserModel } from '../models/users'

const Router = express.Router()

Router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('password must be at least 5 characters')
], async (req: Request, res: Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  const { email, password } = req.body
  const existingUser = await UserModel.findOne({ email })

  if (existingUser) {
    console.log('email already in use')
    return res.send({})
  }

  const user = UserModel.build({ email, password })
  await user.save()
  res.status(201).send(user)
})

export { Router as signupRouter }
