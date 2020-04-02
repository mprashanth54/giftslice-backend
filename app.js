const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const AuthService = require('./services/auth')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const verifyUser = async (req, res, next) => {
    try {
        const { token } = req.headers
        const user = await AuthService.verifyToken(token)
        req.user = user
        next()
    } catch (err) {
        res.status(401).json({ message: "Unauthorized token" })
    }
}


app.use('/campaigns', verifyUser, require('./controllers/campaign'))
app.use('/auth', require('./controllers/auth'))
app.use('/gifts', verifyUser, require('./controllers/gift'))
module.exports = app