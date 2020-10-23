import request from 'supertest'
import { app } from '../../app'

describe('sign up validation', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send(global.credentials)
      .expect(201)
  })

  it('returns 400 on unsuccessful signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: global.credentials.email,
        password: 'p'
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        email: global.credentials.email
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test',
        password: global.credentials.password
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        password: global.credentials.password
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({})
      .expect(400)
  })

  it('fails on duplicate email', async () => {
    await request(app)
      .post('/api/users/signup')
      .send(global.credentials)
      .expect(201)

    await request(app)
      .post('/api/users/signup')
      .send(global.credentials)
      .expect(400)
  })
})

it('sets cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send(global.credentials)
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})
