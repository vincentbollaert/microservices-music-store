import { response } from 'express'
import request from 'supertest'
import { app } from '../../app'

const fields = { email: 'test@test.com', password: 'password' }

it('returns 200 on successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send(fields)

  await request(app)
    .post('/api/users/signin')
    .send(fields)
    .expect(200)
})

it('returns 400 on unsuccessful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send(fields)

  await request(app)
    .post('/api/users/signin')
    .send({ email: '', password: fields.password })
    .expect(400)

  await request(app)
    .post('/api/users/signin')
    .send({ email: fields.email, password: '' })
    .expect(400)

  await request(app)
    .post('/api/users/signin')
    .send({})
    .expect(400)
})

it('sets cookie after successful login', async () => {
  await request(app)
    .post('/api/users/signup')
    .send(fields)

  const response = await request(app)
    .post('/api/users/signin')
    .send(fields)
    .expect(200)
  
    expect(response.get('Set-Cookie')).toBeDefined()
})
