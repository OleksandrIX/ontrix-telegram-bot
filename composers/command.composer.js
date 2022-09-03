const {Composer} = require('telegraf')
const UserModel = require("../models/userModel");
const components = require("../src/components");
const composer = new Composer()

composer.start(async (ctx) => {
    const chatId = ctx.message.chat.id
    const username = ctx.message.chat.username
    let user = await UserModel.findOne({chatId})
    console.log(`User ${chatId} connected`)
    try {
        if (!user) {
            const date = new Date()
            await UserModel.create({
                chatId: chatId,
                username: username,
                createdDate: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.toTimeString().split(' ')[0]}`
            })
            ctx.currentChatId.id = chatId
            await ctx.reply(`${username}, добро пожаловать в ${ctx.botInfo.first_name}`)
            return ctx.replyWithHTML(components.mainMenuText,
                components.inlineMainMenuKeyboard)
        } else {
            ctx.currentChatId.id = chatId
            console.log(ctx.currentChatId)
            return ctx.replyWithHTML(components.mainMenuText,
                components.inlineMainMenuKeyboard)
        }
    } catch (error) {
        ctx.reply('Произошла ошибка')
        console.error(`An error has occurred: ${error}`)
    }
})

composer.command('menu', (ctx) => {
    return ctx.replyWithHTML(components.mainMenuText,
        components.inlineMainMenuKeyboard)
})

composer.command('delete', async (ctx) => {
    const chatId = ctx.currentChatId.id
    const user = await UserModel.findByIdAndDelete((await UserModel.findOne({chatId}))._id)
    console.log(user)
    return ctx.reply('Account delete')
})

module.exports = composer