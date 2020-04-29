require('dotenv').config()
const Dropbox = require('dropbox').Dropbox
const fetch = require('isomorphic-fetch')
const https = require('https')

const dbx = new Dropbox({ accessToken: process.env.DROPBOX, fetch: fetch })

module.exports = dbx