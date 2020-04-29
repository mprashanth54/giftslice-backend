const user = require('express').Router()
const userService = require('../services/user')

user.get('/me', async (req, res) => {
    const user = await userService.getUser(req.user.email)
    res.json(user)
})

module.exports = user