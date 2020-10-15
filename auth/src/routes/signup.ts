import express from 'express'

const Router = express.Router()

Router.post('/api/users/signup', (req, res) => {
  res.send('awyeah!')
})

export { Router as signupRouter }
