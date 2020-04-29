const User = require('../models/user')

exports.getUser = async (email) => {
    return await User.findOne({ email: email }, { password: 0 })
}