const {Composer, session, Router} = require('telegraf')
const UserModel = require("../models/userModel");
const components = require("../src/components");
const bot = new Composer()

bot.start(async (ctx) => {
    const chatId = ctx.message.chat.id
    const username = ctx.message.chat.username
    let user = await UserModel.findOne({chatId})
    console.log(`User ${chatId} connected`)
    ctx.session ??= {chatId: chatId, minSpread: 0}
    try {
        if (!user) {
            const date = new Date()
            await UserModel.create({
                chatId: chatId,
                username: username,
                createdDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.toTimeString().split(' ')[0]}`
            })
            await ctx.reply(`${username}, добро пожаловать в ${ctx.botInfo.first_name}`)
            return ctx.replyWithHTML(components.mainMenuText,
                components.inlineMainMenuKeyboard)
        } else {
            return ctx.replyWithHTML(components.mainMenuText,
                components.inlineMainMenuKeyboard)
        }
    } catch (error) {
        ctx.reply('Произошла ошибка')
        console.error(`An error has occurred: ${error}`)
    }
})

bot.command('menu', (ctx) => {
    return ctx.replyWithHTML(components.mainMenuText,
        components.inlineMainMenuKeyboard)
})

bot.command('delete', async (ctx) => {
    const chatId = ctx.session.chatId
    const user = await UserModel.findByIdAndDelete((await UserModel.findOne({chatId}))._id)
    console.log(user)
    return ctx.reply('Account delete')
})

module.exports = bot