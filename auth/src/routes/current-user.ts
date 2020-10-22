import express, { Request, Response } from 'express'
import { verifyCurrentUser } from '../middlewares/verify-current-user'
import { requireAuth } from '../middlewares/require-auth'

const Router = express.Router()

// the react app won't be able to inspect the cookie to get the current user, so hit this endpoint instead
Router.get('/api/users/currentuser', verifyCurrentUser, requireAuth, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null })
})

export { Router as currentUserRouter }
