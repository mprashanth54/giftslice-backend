const User = require('../models/user')

exports.getUser = async (email) => {
    return await User.findOne({ email: email }, { password: 0 })
}


exports.updateImage = async (email, image) => {
    return await User.updateOne({ email: email }, {
        $set: {
            image: image
        }
    })
}