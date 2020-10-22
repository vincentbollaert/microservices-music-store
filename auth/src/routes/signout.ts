import express from 'express'

const Router = express.Router()

Router.post('/api/users/signout', (req, res) => {
  req.session = null // clear the cookie
  res.send({})
})

export { Router as signoutRouter }
