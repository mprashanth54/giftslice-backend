const mongoose = require('../db')
const Mongoose = require('mongoose')
const Schema = mongoose.Schema;
const User = require('./user')
const Campaign = require('./campaign')

const productSchema = Schema({
    campaign: {
        type: Mongoose.Types.ObjectId,
        required: true,
        ref: 'Campaigns'
    },
    refGift: {
        type: Mongoose.Types.ObjectId,
        required: true,
        ref: 'Gifts'
    },
    price: {
        type: Number,
        required: [true, 'Price is missing'],
        min: [1, 'Minimum is 1 dollar']
    },
    collected: {
        type: Number,
        default: 0
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

const product = mongoose.model('Product', productSchema)



module.exports = product