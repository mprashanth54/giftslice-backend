const mongoose = require('../db')
const Schema = mongoose.Schema;
const User = require('./user')
const Gift = require('./gift')

const campaignSchema = Schema({
    user: {
        type: String,
        required: [true, 'User associated to the campaign is missing'],
        ref: 'Users'
    },
    title: {
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
        type: [{ type: String, ref: 'Users' }]
    },
    organizers: {
        type: [{ type: String, ref: 'Users' }]
    },
    gifts: {
        type: [{ type: Schema.Types.ObjectId, ref: 'Gifts' }]
    },
    image: {
        type: String,
        required: true,
        trim: true
    }
})

const campaign = mongoose.model('Campaigns', campaignSchema)



module.exports = campaign