import request from 'supertest'
import { app } from '../../app'

it('returns 200 on successful call', async () => {
  const cookie = await global.getSignupCookie()

  // browser and postman manage cookies for you, and send cookies on followup requests - supertest does not
  // so you have to send it along manually
  const response = await request(app)
    .get('/api/users/currentuser')
    .set('Cookie', cookie)
    .expect(200)
  
  expect(response.body.currentUser.email).toEqual(global.credentials.email)
})
