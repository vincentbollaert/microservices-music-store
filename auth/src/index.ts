import express from 'express'
import 'express-async-errors'
import mongoose from 'mongoose'
import cookieSession from 'cookie-session'
import { json } from 'body-parser'

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter,
} from './routes'
import { errorHandler } from './middlewares/error-handler'
import { NotFoundError } from './errors/not-found-error'

const app = express()
app.set('trust proxy', true) // https traffic proxied through nginx - force express to trust this traffic
app.use(json())
app.use(cookieSession({
  signed: false, // do not encrypt - will be saving JWT which cannot be tampered with and is ez to impl in other langs
  secure: true, // only send cookie over https
}))
app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

// capture error for all methods on undefined routes
app.all('*', async () => {
  throw new NotFoundError()
})

app.use(errorHandler)

const startApp = async () => {
  try {
    await mongoose.connect('mongodb://auth-mongo-serv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('listening on port 300000')
  })
}

startApp()
