import express, { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const Router = express.Router()

// the react app won't be able to inspect the cookie to get the current user, so hit this endpoint instead
Router.get('/api/users/currentuser', (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    return res.send({ currentUser: null })
  }
  
  // if the jtw token has been messed with, verify will throw an error
  try {
    const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!)
    res.send({ currentUser: payload })
  } catch (error) {
    res.send({ currentUser: null })
  }
})

export { Router as currentUserRouter }
