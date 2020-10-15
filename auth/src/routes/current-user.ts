import express from 'express'

const Router = express.Router()

Router.get('/api/users/currentuser', (req, res) => {
  res.send('awyeah!')
})

export { Router as currentUserRouter }
