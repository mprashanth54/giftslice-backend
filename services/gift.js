const Gift = require('../models/gift')

exports.create = async (user, data) => {
    try {
        data.user = user
        const gift = new Gift(data)
        console.log(gift)
        await gift.save()
    } catch (err) {
        throw err
    }
}

exports.getGlobal = async () => {
    try {
        return await Gift.find({ campaign: null, user: null })
    } catch (err) {
        throw `Unable to fetch gifts`
    }
}

exports.getById = async (id) => {
    try {
        return Gift.findById(id)
    } catch (err) {
        throw err
    }
}