import express from 'express'
import { signOut } from '../controllers/signout'

const Router = express.Router()

Router.post('/api/users/signout', signOut)

export { Router as signoutRouter }
