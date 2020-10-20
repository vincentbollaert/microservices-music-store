import express from 'express'

const Router = express.Router()

Router.post('/api/users/signout', (req, res) => {
  res.send('awyeah!')
})

export { Router as signoutRouter }
