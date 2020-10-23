import request from 'supertest'
import { app } from '../../app'

it('clears cookie on successful signout', async () => {
  let response = await request(app)
    .post('/api/users/signup')
    .send(global.credentials)
  
  expect(response.get('Set-Cookie')).toBeDefined

  response = await request(app)
    .post('/api/users/signout')
    .send({})
    .expect(200)
  
  expect(response.get('Set-Cookie')[0])
    .toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})
