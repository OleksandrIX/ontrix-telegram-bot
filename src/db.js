const {mongoose} = require('mongoose')
require('dotenv').config()

module.exports.db = mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})