const User = require('../models/user')
const DbxService = require('../services/dropbox')


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