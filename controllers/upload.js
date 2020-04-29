const upload = require('express').Router()
const dbx = require('../dropbox')
const randtoken = require('rand-token')

upload.post('/', async (req, res) => {
    try {
        console.log(req.files)
        const name = `${randtoken.generate(16)} - ${req.files.file.name}`
        await dbx.filesUpload({ path: `/images/${name}`, contents: req.files.file.data })
        res.json({ message: "Success", name: name })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'File Upload Failed' })
    }
})

upload.get('/', async (req, res) => {
    try {
        const { file } = req.query
        const { link } = await dbx.filesGetTemporaryLink({ path: `/images/${file}` })
        res.redirect(link)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'File Upload Failed' })
    }
})

module.exports = upload