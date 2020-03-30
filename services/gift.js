const Gift = require('../models/gift')

exports.create = async (user, data) => {
    try {
        const gift = new Gift({ user: user, data })
        await gift.save()
    } catch (err) {
        throw err
    }
}

exports.getById = async (id) => {
    try {
        return Gift.findById(id)
    } catch (err) {
        throw err
    }
}