const User = require('../models/user')
const DbxService = require('../services/dropbox')
const AuthService = require('./auth')

exports.getUser = async (email) => {
    const user = await User.findOne({ email: email }, { password: 0 })
    user.image = user.image ? await DbxService.getTempLink(user.image) : null
    return user
}


exports.updateImage = async (email, image) => {
    return await User.updateOne({ email: email }, {
        $set: {
            image: image
        }
    })
}


exports.updatePassword = async (email, oldPassword, newPassword) => {
    try {
        const user = await User.findOne({ email: email })
        await AuthService.verifyPass(oldPassword, user.password)
        const hashPass = await AuthService.getHashPassword(newPassword)
        await User.updateOne({ email: email }, {
            $set: {
                password: hashPass
            }
        })
    } catch (err) {
        console.log(err)
        throw `Unauthorized`
    }
}

exports.getAll = async (email) => {
    const users = await User.find({ email: { $ne: email } }, { password: 0 })
    const images = await Promise.all(users.map((user) => {
        return user.image ? DbxService.getTempLink(user.image) : null
    }))
    return users.map((user, i) => {
        user.image = images[i]
        return user
    })
}