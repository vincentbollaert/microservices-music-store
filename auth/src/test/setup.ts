import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'
import { app } from '../app'

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
