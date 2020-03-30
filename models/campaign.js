const mongoose = require('../db')
const Schema = mongoose.Schema;
const User = require('./user')

const campaignSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: [true, 'User associated to the campaign is missing'],
        ref: 'Users'
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    endDate: {
        type: Date
    },
    description: {
        type: String,
        required: [true, 'Description is missing'],
        trim: true
    },
    contributors: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
    },
    origanizers: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Users' }]
    },
    gifts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Gifts' }]
    }
})

campaignSchema.pre('save', async (next, data) => {
    try {
        const { origanizers, contributors } = data
        const org_count = await User.count({
            _id: {
                $in: [origanizers]
            }
        })
        const contrib_count = await User.count({
            _id: {
                $in: [contributors]
            }
        })

        //To be implemented
        // const gift_count = await

        console.log(org_count, contrib_count)

        if (org_count != origanizers.length || contrib_count != contributors.length) {
            return next(new Error('Users not present in system'))
        }

        const user_count = await User.count({ _id: Schema.Types.ObjectId(user) })
        if (user_count != 1) {
            return next(new Error('User not found'))
        }
    } catch (err) {
        return next(new Error({ error: err.message }))
    }
})

const campaign = mongoose.model('Campaigns', campaignSchema)



module.exports = campaign