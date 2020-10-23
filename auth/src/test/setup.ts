import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../app'

declare global {
  namespace NodeJS {
    interface Global {
      credentials: {
        email: string;
        password: string;
      }
      getSignupCookie(): Promise<string[]> // returns async and cookie type is string[]
    }
  }
}

let mongo: any
beforeAll(async () => {
  // was coming from k8s secret. need to set here as tests are not being run in cluster
  process.env.JWT_KEY = 'somesthings'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections()

  for (let collection of collections) {
    await collection.deleteMany({})
  };
})

afterAll(async() => {
  await mongo.stop()
  await mongoose.connection.close()
})

global.credentials = {
  email: 'test@test.com',
  password: 'password'
}
global.getSignupCookie = async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201)
  
  return response.get('Set-Cookie')
}
