const campaign = require('express').Router()
const CampaignService = require('../services/campaign')

// campaign.get('/:id', async (req, res) => {
//     try {
//         await CampaignService.create(req.body)
//         res.json({ message: "Successfully Created" })
//     } catch (err) {
//         res.status(400).json({ error: err })
//     }
// })


campaign.get('/my', async (req, res) => {
    try {
        console.log("In campaigns")
        const campaigns = await CampaignService.getOwnList(req.user.email)
        res.json({ campaigns: campaigns })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

campaign.get('/home', async (req, res) => {
    try {
        console.log("In campaigns")
        const campaigns = await CampaignService.getLandingPage(req.user.email)
        res.json({ campaigns: campaigns })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

campaign.post('/', async (req, res) => {
    try {
        await CampaignService.create(req.user.email, req.body)
        res.json({ message: "Successfully Created" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

module.exports = campaign