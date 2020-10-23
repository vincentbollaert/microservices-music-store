import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import { BadRequestError } from '../errors/bad-request-error'
import { UserModel } from '../models/users'
import { Password } from '../services/password'

export const signIn = async (req: Request, res: Response) => {
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
}
