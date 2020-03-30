const mongoose = require('../db')
const Schema = mongoose.Schema;
const User = require('./user')

const giftSchema = Schema({
    campaign: {
        type: [Schema.Types.ObjectId, null],
        default: null,
        ref: 'Campaigns'
    },
    user: {
        type: [Schema.Types.ObjectId, null],
        default: null,
        ref: 'Users'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, 'Description is missing'],
        trim: true
    },
    images: {
        type: [String],
        required: [true, 'Image is missing'],
        trim: true
    },
    price: {
        type: Number,
        required: [true, 'Price is missing'],
        min: [1, 'Minimum is 1 dollar']
    },
    link: {
        type: String,
        trim: true
    }
})

giftSchema.pre('save', async (next, data) => {
    try {
        const { user } = data
        const user_count = await User.count({ _id: Schema.Types.ObjectId(user) })
        if (user_count != 1) {
            return next(new Error('User not found'))
        }
    } catch (err) {
        return next(new Error({ error: err.message }))
    }
})

const gift = mongoose.model('Gifts', giftSchema)



module.exports = gift