import { response } from 'express'
import request from 'supertest'
import { app } from '../../app'

it('returns 200 on successful signin', async () => {
  await global.signUp()

  await request(app)
    .post('/api/users/signin')
    .send(global.credentials)
    .expect(200)
})

it('returns 400 on unsuccessful signin', async () => {
  await global.signUp()

  await request(app)
    .post('/api/users/signin')
    .send({ email: '', password: global.credentials.password })
    .expect(400)

  await request(app)
    .post('/api/users/signin')
    .send({ email: global.credentials.email, password: '' })
    .expect(400)

  await request(app)
    .post('/api/users/signin')
    .send({})
    .expect(400)
})

it('sets cookie after successful login', async () => {
  await global.signUp()

  const response = await request(app)
    .post('/api/users/signin')
    .send(global.credentials)
    .expect(200)
  
    expect(response.get('Set-Cookie')).toBeDefined()
})
