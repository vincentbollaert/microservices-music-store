import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import { validateRequest } from '../middlewares/validate-request';

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
(req: Request, res: Response) => {

  res.send('awyeah!')
})

export { Router as signinRouter }
