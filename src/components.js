const {Markup} = require('telegraf')

const mainMenuText = 'Arbitrage Screener\n ' +
    '- Работаем на 15 бирж\n ' +
    '- Обновление монет каждые 1 минуты\n ' +
    '- Уведомления о новых монетах'

const inlineMainMenuKeyboard = Markup.inlineKeyboard([
    [Markup.button.callback('📊 Arbitrage', 'arbitrage')],
    [Markup.button.callback('⚙️ Настройки', 'settings')]
])

const settingsButton = Markup.inlineKeyboard(
    [
        [Markup.button.callback('Уведомление', 'ff')],
        [Markup.button.callback('Помощь', 'help')],
        [Markup.button.callback('<Назад', 'back')]
    ]
)

const arbitrageText = 'Чтобы использовать арбитражный скринер, вы должны подписаться на платную подписку которая стоит 50$\n\n' +
    'Как заплатить?\n\n' +
    'Заплатить надо криптовалютой USDT на кошелек:\n' +
    '............\n' +
    'Сеть  -......\n\n' +
    'Если вы оплатили вы пишите СЮДА, туда скидываете скриншот оплати\n' +
    '- Чтобы на скриншоте было время видно кошелек ваш и наш\n' +
    '- Сума перевода\n' +
    '- В какое время вы переводили данную транзакцию\n' +
    'После чего вам администратор скажет, что делать дальше'

const arbitrageButton = Markup.inlineKeyboard(
    [
        [Markup.button.callback('✅ Pay Now', 'pay')],
        [Markup.button.callback('<Назад', 'back')]
    ]
)

module.exports = {mainMenuText, inlineMainMenuKeyboard, settingsButton, arbitrageText, arbitrageButton}

