import express from 'express'
import { body } from 'express-validator'
import { signUp } from '../controllers/signup'
import { validateRequest } from '../middlewares/validate-request'

const Router = express.Router()

Router.post('/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 5, max: 20 })
      .withMessage('password must be at least 5 characters'),
    validateRequest
  ],
  signUp
 )

export { Router as signupRouter }
