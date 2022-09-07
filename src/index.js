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
// const scene = new Scenes.WizardScene(
//     'MIN_SPREAD',
//     async (ctx, next) => {
//         await ctx.reply('Введите минимальний спред связок:')
//         return ctx.scene.leave()
//     }
// )
// const stage = new Scenes.Stage([scene])

db.then(() => {
    console.log('Connected to db successfully')
}).catch((error) => {
    console.error(`An error has occurred: ${error.message}`)
})

bot.context.arrayTickers = []
bot.use(session())
bot.use(composerStart)
bot.use(composerAction)
bot.use(actionArbitrageButton)


bot.action('min_spread', async (ctx, next) => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply('Введите минимальний спред связок:')
        await bot.hears(/^[0-9]+$/, (ctx) => {
            const minSpread = ctx.message.text || 0
            ctx.session.minSpread = minSpread
            ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= minSpread)
            let arr = []
            let countPages = Math.ceil(ctx.arrayTickers.length / 4)
            for (let i = 0; i < 4; i++) {
                arr[i] = ctx.arrayTickers[i]
            }
            return ctx.replyWithHTML(components.arbitrageBasicMenuText(arr), components.arbitrageBasicMenuButton(countPages,1,ctx.session.minSpread || 1), {
                disable_web_page_preview: true,
            })
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})
startParsingTickers().then(res=>{
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










