const mongoose = require('../db')
const Schema = mongoose.Schema;
const User = require('./user')
const Campaign = require('./campaign')

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
        const user_count = await User.count({ _id: Schema.Types.ObjectId(user) })
        const campaign_count = await Campaign.count({ _id: Schema.Types.ObjectId(campaign) })
        if (user_count != 1 || campaign_count != 1) {
            return next(new Error('Invalid Request'))
        }
    } catch (err) {
        return next(err)
    }
})

const gift = mongoose.model('Gifts', giftSchema)



module.exports = gift