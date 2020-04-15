const gift = require('express').Router()
const GiftService = require('../services/gift')
// const CampaignService = require('../services/campaign')

// gift.get('/:id', async (req, res) => {
//     try {
//         const { id } = req.params
//         const { userID } = req.user.id
//         const gift = await GiftService.getById(id, userID)
//         res.json(gift)
//     } catch (err) {
//         res.status(400).json({ error: err })
//     }
// })

gift.post('/', async (req, res) => {
    try {
        await GiftService.create(req.user.id, req.body)
        res.json({ message: "Successfully Created" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

gift.post('/global', async (req, res) => {
    try {
        console.log(req.body)
        await GiftService.create(null, req.body)
        res.json({ message: "Successfully Created" })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})

gift.get('/global', async (req, res) => {
    try {
        const gifts = await GiftService.getGlobal()
        res.json({ gifts: gifts })
    } catch (err) {
        res.status(400).json({ error: err })
    }
})



module.exports = gift