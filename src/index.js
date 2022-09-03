const {Telegraf} = require('telegraf')
const {db} = require('./db')
const composerStart = require('../composers/command.composer')
const composerAction = require('../composers/action.composer')
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

let currentCharId = {id: ''}

db.then(() => {
    console.log('Connected to db successfully')
}).catch((error) => {
    console.error(`An error has occurred: ${error.message}`)
})

bot.context.currentChatId = currentCharId
bot.use(composerStart)
bot.use(composerAction)

bot.launch()
    .then(() => {
        console.log('Telegram bot launched')
    })
    .catch((error) => {
        console.error(`An error has occurred: ${error.message}`)
    })










