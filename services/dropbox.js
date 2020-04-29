const dbx = require('../dropbox')

exports.getTempLink = async (file) => {
    const { link } = await dbx.filesGetTemporaryLink({ path: `/images/${file}` })
    return link
}