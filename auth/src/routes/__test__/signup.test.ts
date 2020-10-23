import request from 'supertest'
import { app } from '../../app'

const fields = { email: 'test@test.com', password: 'password' }

describe('sign up validation', () => {
  it('returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send(fields)
      .expect(201)
  })

  it('returns 400 on unsuccessful signup', async () => {
    await request(app)
      .post('/api/users/signup')
      .send({
        email: fields.email,
        password: 'p'
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        email: fields.email
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        email: 'test',
        password: fields.password
      })
      .expect(400)

    await request(app)
      .post('/api/users/signup')
      .send({
        password: fields.password
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
      .send(fields)
      .expect(201)

    await request(app)
      .post('/api/users/signup')
      .send(fields)
      .expect(400)
  })
})

it('sets cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password'
    })
    .expect(201)

    expect(response.get('Set-Cookie')).toBeDefined()
})
