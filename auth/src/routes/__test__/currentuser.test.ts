import request from 'supertest'
import { app } from '../../app'

const fields = { email: 'test@test.com', password: 'password' }

it('returns 200 on successful call', async () => {
  const signupResponse = await request(app)
    .post('/api/users/signup')
    .send(fields)
    .expect(201)
  const cookie = signupResponse.get('Set-Cookie')

  // browser and postman manage cookies for you, and send cookies on followup requests - supertest does not
  // so you have to send it along manually
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200)
  
  expect(response.body.currentUser.email).toEqual(fields.email)
})
