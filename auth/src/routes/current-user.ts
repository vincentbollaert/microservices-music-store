import express, { Request, Response } from 'express'
import { currentUser } from '../middlewares/current-user'

const Router = express.Router()

// the react app won't be able to inspect the cookie to get the current user, so hit this endpoint instead
Router.get('/api/users/currentuser', currentUser, (req: Request, res: Response) => {
  res.send({ currentUser: req.currentUser || null })
})

export { Router as currentUserRouter }
