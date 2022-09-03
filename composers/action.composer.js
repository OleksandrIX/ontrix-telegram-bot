const {Composer} = require('telegraf')
const UserModel = require("../models/userModel");
const components = require("../src/components");
const composer  = new Composer()

composer.action('arbitrage', async (ctx) => {
    ctx.deleteMessage()
    const chatId = ctx.currentChatId.id
    const user = await UserModel.findOne({chatId})
    try {
        await ctx.answerCbQuery()
        if (!user?.isActiveSubscription){
            return ctx.reply(components.arbitrageText, components.arbitrageButton)
        }
        return ctx.reply(`Text`)
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('settings', async (ctx) => {
    ctx.deleteMessage()
    const chatId = ctx.currentChatId.id
    const user = await UserModel.findOne({chatId})
    try {
        await ctx.answerCbQuery()
        return ctx.reply(`Account ID: ${user?.chatId}\nПрибытие: ${user?.createdDate}`, components.settingsButton)
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('back',(ctx) => {
    ctx.deleteMessage()
    ctx.answerCbQuery()
    return ctx.replyWithHTML(components.mainMenuText,
        components.inlineMainMenuKeyboard)
})

composer.action('help',(ctx)=>{
    ctx.answerCbQuery()
    return ctx.reply('Контакт')
})

module.exports = composer