const {Telegraf, session, Scenes: {WizardScene, Stage}, Scenes, Router} = require('telegraf')
const {db} = require('./db')
const composerStart = require('../composers/command.composer')
const composerAction = require('../composers/action.composer')
const actionArbitrageButton = require('../composers/actionArbitrageButton.composer')
const {startParsingTickers} = require('../arbitrage-parser')
const UserModel = require("../models/userModel");
const components = require("./components");
require('dotenv').config()

const bot = new Telegraf(process.env.BOT_TOKEN)

db
    .then(() => {
        console.log('Connected to db successfully')
    })
    .catch((error) => {
        console.error(`An error has occurred: ${error.message}`)
    })

bot.context.arrayTickers = []
bot.use(session())
bot.use(composerStart)
bot.use(composerAction)
bot.use(actionArbitrageButton)

startParsingTickers().then(res => {
    bot.context.arrayTickers = res
})
setInterval(async () => {
    bot.context.arrayTickers = await startParsingTickers()

}, 60 * 1000)

bot.launch()
    .then(() => {
        console.log('Telegram bot launched')
    })
    .catch((error) => {
        console.error(`An error has occurred: ${error.message}`)
    })










