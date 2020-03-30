const auth = require('express').Router()
const authService = require('../services/auth')

auth.post('/register', async (req, res) => {
    try {
        const { email, pass, name, mobile } = req.body
        await authService.register(email, pass, name, mobile)
        res.json({ message: 'User successfully created' })
    } catch (err) {
        res.status(400).json({ err: err })
    }
})

auth.post('/login', async (req, res) => {
    try {
        const { email, pass } = req.body
        const token = await authService.logIn(email, pass)
        res.json({ token: token })
    } catch (err) {
        console.log(err)
        res.status(401).json({ err: 'Invalid Credentials' })
    }
})

module.exports = auth