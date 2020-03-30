const Campaign = require('../models/campaign')

exports.create = async (userId, campaignData) => {
    try {
        const campaign = new Campaign({ user: userId, campaignData })
        await campaign.save(campaignData)
    } catch (err) {
        console.log(err)
        throw `Unable to create create campaign`
    }
}