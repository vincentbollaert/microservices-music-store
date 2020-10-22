import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { UserModel } from '../models/users';
import { Password } from '../services/password';

const Router = express.Router()

Router.post('/api/users/signin', [
  body('email')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('must provide a password')
],
validateRequest,
async (req: Request, res: Response) => {
  const { email, password } = req.body
  const existingUser = await UserModel.findOne({ email })

  if (!existingUser) {
    throw new BadRequestError('invalid credentials') // don't be too specific with this for hackzors
  }

  const isCorrectPassword = await Password.compare(existingUser.password, password)
  if (!isCorrectPassword) {
    throw new BadRequestError('invalid credentials')
  }

  // copy-pasted from signup
  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email,
  }, process.env.JWT_KEY!)

  req.session = {
    jwt: userJwt
  }

  res.status(200).send(existingUser)
})

export { Router as signinRouter }
