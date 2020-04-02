const app = require('./app')
require('dotenv').config()

app.listen(process.env.PORT, (err, res) => {
    console.log('Server started in port 3000')
})