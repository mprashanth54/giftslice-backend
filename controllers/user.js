const user = require('express').Router()
const userService = require('../services/user')

user.get('/me', async (req, res) => {
    try {
        const user = await userService.getUser(req.user.email)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Bad Request" })
    }

})

user.put('/me/image', async (req, res) => {
    const { image } = req.body
    const user = await userService.updateImage(req.user.email, image)
    res.json({ message: "Success" })
})

module.exports = user