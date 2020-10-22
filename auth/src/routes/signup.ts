import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'
import { BadRequestError } from '../errors/bad-request-error'
import { validateRequest } from '../middlewares/validate-request'
import { UserModel } from '../models/users'

const Router = express.Router()

// NOTES
// this needs to be refactored to MVC
Router.post('/api/users/signup', [
  body('email')
    .isEmail()
    .withMessage('email must be valid'),
  body('password')
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage('password must be at least 5 characters')
],
validateRequest,
 async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (await UserModel.findOne({ email })) {
    throw new BadRequestError('email already in use')
  }

  const user = UserModel.build({ email, password })
  await user.save()

  // create jwt and save to cookie base64 encoded (session added to req with cookie-session lib)
  // saving id and email for easy lookup once decrypted
  // req.session possibly null so TS complains, instead of dot notation just set it as obj
  const userJwt = jwt.sign({
    id: user.id,
    email: user.email,
  }, process.env.JWT_KEY!) // ! tells TS that we know that JWT_KEY is defined (check in start fn)

  req.session = {
    jwt: userJwt
  }

  res.status(201).send(user)
})

export { Router as signupRouter }
