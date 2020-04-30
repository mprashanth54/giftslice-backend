const user = require('express').Router()
const userService = require('../services/user')

user.get('/', async (req, res) => {
    const { email } = req.user
    const users = await userService.getAll(email)
    console.log("here")
    res.json({ users: users })
})

user.get('/me', async (req, res) => {
    try {
        const user = await userService.getUser(req.user.email)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: "Bad Request" })
    }

})


user.post('/change-password', async (req, res) => {
    try {
        const { email } = req.user
        const { oldPassword, newPassword } = req.body
        await userService.updatePassword(email, oldPassword, newPassword)
        res.json({ message: "Success" })
    } catch (err) {
        res.status(400).json({ message: "Bad Request" })
    }


})

user.put('/me/image', async (req, res) => {
    const { image } = req.body
    const user = await userService.updateImage(req.user.email, image)
    res.json({ message: "Success" })
})

module.exports = user