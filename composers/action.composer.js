const {Composer} = require('telegraf')
const UserModel = require("../models/userModel");
const components = require("../src/components");
const bot = new Composer()

bot.action('settings', async (ctx) => {
    ctx.deleteMessage()
    const chatId = ctx.session.chatId|| 0
    const user = await UserModel.findOne({chatId})
    try {
        await ctx.answerCbQuery()
        return ctx.reply(`Account ID: ${user?.chatId}\nПрибытие: ${user?.createdDate}`, components.settingsButton)
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

bot.action('arbitrage', async (ctx) => {
    ctx.deleteMessage()
    const chatId = ctx.session.chatId || 0
    const user = await UserModel.findOne({chatId})
    try {
        await ctx.answerCbQuery()
        if (ctx.arrayTickers.length === 0) {
            await ctx.reply('Сейчас нету связок')
            return ctx.reply(components.mainMenuText, components.inlineMainMenuKeyboard)
        } else if (user?.isActiveSubscription) {
            let arr = []
            let countPages = Math.ceil(ctx.arrayTickers.length / 4)
            for (let i = 0; i < 4; i++) {
                arr[i] = ctx.arrayTickers[i]
            }
            return ctx.replyWithHTML(components.arbitrageBasicMenuText(arr), components.arbitrageBasicMenuButton(countPages), {
                disable_web_page_preview: true,
            })
        } else {
            return ctx.reply(components.arbitrageStartMenuText, components.arbitrageStartMenuButton)
        }
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

bot.action('back', (ctx) => {
    ctx.deleteMessage()
    ctx.answerCbQuery()
    return ctx.replyWithHTML(components.mainMenuText,
        components.inlineMainMenuKeyboard)
})

bot.action('help', async (ctx) => {
    ctx.answerCbQuery()
    await ctx.reply('Контакт')
    return ctx.replyWithHTML(components.mainMenuText,
        components.inlineMainMenuKeyboard)
})

bot.action('min_spread', async (ctx, next) => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply('Введите минимальний спред связок:')
        await bot.hears(/^[0-9]+$/, (ctx) => {
            const minSpread = ctx.message.text || 0
            ctx.session.minSpread = minSpread
            ctx.arrayTickers = ctx.arrayTickers.filter(ticker => ticker.spreadN >= minSpread)
            let arr = []
            let countPages = Math.ceil(ctx.arrayTickers.length / 4)
            for (let i = 0; i < 4; i++) {
                arr[i] = ctx.arrayTickers[i]
            }
            return ctx.replyWithHTML(components.arbitrageBasicMenuText(arr), components.arbitrageBasicMenuButton(countPages, 1, ctx.session.minSpread || 1), {
                disable_web_page_preview: true,
            })
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

module.exports = bot