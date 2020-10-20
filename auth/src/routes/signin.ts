import express from 'express'

const Router = express.Router()

Router.post('/api/users/signin', (req, res) => {
  res.send('awyeah!')
})

export { Router as signinRouter }
