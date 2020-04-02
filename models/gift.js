const mongoose = require('../db')
const Mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./user')
const Campaign = require('./campaign')

const giftSchema = Schema({
    campaign: {
        type: Mongoose.Types.ObjectId,
        default: null,
        ref: 'Campaigns'
    },
    user: {
        type: Mongoose.Types.ObjectId,
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
    tags: {
        type: [String],
        required: [true, 'Tags is missing'],
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
        trim: true,
        default: null
    }
})

giftSchema.pre('save', async (next, data) => {
    try {
        const { user, campaign } = data
        // data._id = Mongoose.Types.ObjectId
        if (user) {
            const user_count = await User.countDocuments({ _id: Mongoose.Types.ObjectId(user) })
            if (user_count != 1) {
                return next(new Error('Invalid User'))
            }
        }
        if (campaign) {
            const campaign_count = await Campaign.countDocuments({ _id: Mongoose.Types.ObjectId(campaign) })
            if (campaign_count != 1) {
                return next(new Error('Invalid Campaign'))
            }
        }

    } catch (err) {
        return next(err)
    }
})

const gift = mongoose.model('Gifts', giftSchema)



module.exports = gift