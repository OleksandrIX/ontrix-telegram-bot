const {Composer} = require('telegraf')
const components = require("../src/components");

const composer = new Composer()
let arrayCurrentTickers = []
let currentPage = 1
let countPages = 0

composer.action('last_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage = countPages
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[(ctx.arrayTickers.length - 5) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })

    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('first_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage = 1
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('next_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage += 1
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[((currentPage * 4) - 4) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('previous_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage -= 1
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[((currentPage * 4) - 8) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('second_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage = 2
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[((currentPage * 4) - 4) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('third_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage = 3
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[((currentPage * 4) - 4) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('third_back_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage = countPages - 3
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[((currentPage * 4) - 4) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('fourth_back_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage = countPages - 4
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[((currentPage * 4) - 4) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})

composer.action('fourth_page', async (ctx) => {
    try {
        await ctx.deleteMessage()
        await ctx.answerCbQuery()
        ctx.arrayTickers = ctx.arrayTickers.filter(ticker=> ticker.spreadN >= ctx.session.minSpread || 0)
        countPages = Math.ceil(ctx.arrayTickers.length / 4)
        currentPage = 4
        for (let i = 0; i < 4; i++) {
            arrayCurrentTickers[i] = ctx.arrayTickers[((currentPage * 4) - 4) + i]
        }
        return ctx.replyWithHTML(components.arbitrageBasicMenuText(arrayCurrentTickers), components.arbitrageBasicMenuButton(countPages, currentPage, ctx.session.minSpread || 0), {
            disable_web_page_preview: true,
        })
    } catch (error) {
        console.error(`An error has occurred: ${error.message}`)
    }
})


module.exports = composer