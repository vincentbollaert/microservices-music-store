import express from 'express'
import { verifyCurrentUser } from '../middlewares/verify-current-user'
import { getCurrentUser } from '../controllers/currentuser'

const Router = express.Router()

// the react app won't be able to inspect the cookie to get the current user, so hit this endpoint instead
Router.get('/api/users/currentuser', [verifyCurrentUser], getCurrentUser)

export { Router as currentUserRouter }
