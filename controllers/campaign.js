const campaign = require('express').Router()
const CampaignService = require('../services/campaign')

campaign.get('/:id', async (req, res) => {
    try {
        await CampaignService.create(req.body)
        res.json({ message: "Successfully Created" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

campaign.post('/', async (req, res) => {
    try {
        console.log(req.user)
        await CampaignService.create(req.user._id, req.body)
        res.json({ message: "Successfully Created" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

module.exports = campaign