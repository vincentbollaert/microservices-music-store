import request from 'supertest'
import { app } from '../../app'

describe('sign up validation', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201)
  })

  it('returns 400 on invalid email', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test',
        password: 'password'
      })
      .expect(400)
  })

  it('returns 400 on invalid password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'p'
      })
      .expect(400)
  })

  // note the use of await instead of return
  it('returns 400 on missing email or password', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com'
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        password: 'password'
      })
      .expect(400)
  })

  it('returns 400 on missing email and password', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400)
  })

  it('fails on duplicate email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(201)

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test@test.com',
        password: 'password'
      })
      .expect(400)
  })
})
