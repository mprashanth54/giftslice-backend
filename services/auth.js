const bcrypt = require('bcrypt')
const saltRounds = 10
const User = require('../models/user')
const jwt = require('jsonwebtoken')


exports.getHashPassword = async (pass) => {
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(pass, salt)
}

exports.register = async (email, pass, name, mobile) => {
    try {
        const hashPassword = await this.getHashPassword(pass)
        const user = new User({
            name: name,
            password: hashPassword,
            email: email,
            mobile: mobile ? mobile : null
        })
        await user.save()
    } catch (err) {
        console.log(err)
        throw `Unable to create user`
    }
}

exports.getJWT = async (data) => {
    return await jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: data
    }, 'Top-Secret-Sample-Key-Will-Be-Read-By-Hidden-File')
}

exports.verifyPass = async (pass, hashPass) => {
    const valid = await bcrypt.compare(pass, hashPass)
    if (!valid) {
        throw `Invalid Credentials`
    }
}

exports.logIn = async (email, pass) => {
    const hashPassword = await this.getHashPassword(pass)
    const user = await User.findOne({ email: email })
    if (user) {
        // console.log(user)
        await this.verifyPass(pass, user.password)
        const token = await this.getJWT({ email: user.email, id: user._id })
        return token
    }
    else {
        throw `Invalid Credentials`
    }
}

exports.verifyToken = async (token) => {
    try {
        console.log('verify')
        const tokenData = await jwt.verify(token, 'Top-Secret-Sample-Key-Will-Be-Read-By-Hidden-File')
        const { email } = tokenData.data
        return await User.findOne({ email: email }, { password: 0 })
    } catch (err) {
        console.log(err)
        throw `Invalid Token`
    }

}