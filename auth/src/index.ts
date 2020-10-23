import mongoose from 'mongoose'
import { app } from './app'

const startApp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }
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
