const Campaign = require('../models/campaign')
const ObjectID = require('mongoose').Types.ObjectId
const DbxService = require('../services/dropbox')
const User = require('../models/user')

exports.processData = async (gifts) => {
    return gifts.map((gift) => {
        return ObjectID(gift)
    })
}

exports.create = async (email, campaignData) => {
    try {
        campaignData.user = email
        campaignData.gifts = await this.processData(campaignData.gifts)
        const campaign = new Campaign(campaignData)
        console.log(campaign)
        await campaign.save()
    } catch (err) {
        console.log(err)
        throw `Unable to create create campaign`
    }
}

exports.getOwnList = async (email) => {
    try {
        const campaigns = await Campaign.find({ user: email }).lean()
        const user = await User.findOne({
            email: email
        })
        console.log(user)
        const u_image = user.image ? await DbxService.getTempLink(user.image) : null
        const images = await Promise.all(campaigns.map((campaign) => {
            return DbxService.getTempLink(campaign.image)
        }))
        return campaigns.map((campaign, i) => {
            campaign.u_image = u_image
            campaign.image = images[i]
            return campaign
        })

    } catch (err) {
        console.log(err)
        throw `Unable to fetch campaigns`
    }
}

exports.getLandingPage = async (email) => {
    try {
        const campaigns = await Campaign.find({ $or: [{ user: email }, { organizers: email }, { contributors: email }] }).lean()
        const userEmails = campaigns.map((campaign) => {
            return campaign.user
        })
        const users = await Promise.all(userEmails.map((user) => {
            return User.findOne({
                email: user
            })
        }))
        const user_images = await Promise.all(
            users.map((user) => {
                return user.image ? DbxService.getTempLink(user.image) : null
            })
        )
        const images = await Promise.all(campaigns.map((campaign) => {
            return DbxService.getTempLink(campaign.image)
        }))
        return campaigns.map((campaign, i) => {
            campaign.u_image = user_images[i]
            campaign.image = images[i]
            return campaign
        })

    } catch (err) {
        console.log(err)
        throw `Unable to fetch campaigns`
    }
}