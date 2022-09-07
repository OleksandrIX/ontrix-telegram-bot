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

const arbitrageStartMenuText = 'Чтобы использовать арбитражный скринер, вы должны подписаться на платную подписку которая стоит 50$\n\n' +
    'Как заплатить?\n\n' +
    'Заплатить надо криптовалютой USDT на кошелек:\n' +
    '............\n' +
    'Сеть  -......\n\n' +
    'Если вы оплатили вы пишите СЮДА, туда скидываете скриншот оплати\n' +
    '- Чтобы на скриншоте было время видно кошелек ваш и наш\n' +
    '- Сума перевода\n' +
    '- В какое время вы переводили данную транзакцию\n' +
    'После чего вам администратор скажет, что делать дальше'

const arbitrageStartMenuButton = Markup.inlineKeyboard(
    [
        [Markup.button.callback('✅ Pay Now', 'pay')],
        [Markup.button.callback('<Назад', 'back')]
    ]
)

const arbitrageBasicMenuText = (arrayArbitrageItem) => {
    let message = ''
    for (const arrayArbitrageItemElement of arrayArbitrageItem) {
        message += createMessageArbitrageItem(arrayArbitrageItemElement)
    }
    return message
}

function createMessageArbitrageItem(arbitrageItem) {
    return `${arbitrageItem?.spread}
<a href="${arbitrageItem?.buyTicker?.linkOnTicker}">${arbitrageItem?.buyTicker?.exchange}</a>(${arbitrageItem?.buyTicker?.nameTicker})-> <a href="${arbitrageItem?.sellTicker?.linkOnTicker}">${arbitrageItem?.sellTicker?.exchange}</a>(${arbitrageItem?.sellTicker?.nameTicker})
\$${arbitrageItem?.buyTicker?.price}->\$${arbitrageItem?.sellTicker?.price}\n\n`
}

const arbitrageBasicMenuButton = (countPages = 0, currentPage = 1, minSpread = 0) => {
    if (countPages === 5){
        if (currentPage === 1){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`·1·`, 'current_page'),
                        Markup.button.callback(`2`, 'next_page'),
                        Markup.button.callback(`3`, 'third_page'),
                        Markup.button.callback(`4`, 'fourth_page'),
                        Markup.button.callback(`5`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if(currentPage === 2){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`·2·`, 'current_page'),
                        Markup.button.callback(`3`, 'next_page'),
                        Markup.button.callback(`4`, 'fourth_page'),
                        Markup.button.callback(`5`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if (currentPage ===3){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`2`, 'previous_page'),
                        Markup.button.callback(`·3·`, 'current_page'),
                        Markup.button.callback(`4`, 'next_page'),
                        Markup.button.callback(`5`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if (currentPage === 4){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`2`, 'second_page'),//
                        Markup.button.callback(`3`, 'previous_page'),
                        Markup.button.callback(`·4·`, 'current_page'),
                        Markup.button.callback(`5`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if (currentPage === 5){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`2`, 'second_page'),//
                        Markup.button.callback(`3`, 'third_page'),
                        Markup.button.callback(`4`, 'previous_page'),
                        Markup.button.callback(`·5·`, 'current_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }

        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`·1·`, 'current_page'),
                    Markup.button.callback(`2`, 'next_page'),
                    Markup.button.callback(`3`, 'third_page'),
                    Markup.button.callback(`4`, 'fourth_page'),
                    Markup.button.callback(`${countPages}`, 'last_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    }else if (countPages === 4){
        if (currentPage === 1){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`·1·`, 'current_page'),
                        Markup.button.callback(`2`, 'next_page'),
                        Markup.button.callback(`3`, 'third_page'),
                        Markup.button.callback(`4`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if(currentPage === 2){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`·2·`, 'current_page'),
                        Markup.button.callback(`3`, 'next_page'),
                        Markup.button.callback(`4`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if (currentPage ===3){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`2`, 'previous_page'),
                        Markup.button.callback(`·3·`, 'current_page'),
                        Markup.button.callback(`4`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if (currentPage === 4){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`2`, 'second_page'),//
                        Markup.button.callback(`3`, 'previous_page'),
                        Markup.button.callback(`·4·`, 'current_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }
    }else if (countPages === 3){
        if (currentPage === 1){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`·1·`, 'current_page'),
                        Markup.button.callback(`2`, 'next_page'),
                        Markup.button.callback(`3`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if(currentPage === 2){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`·2·`, 'current_page'),
                        Markup.button.callback(`3`, 'last_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if (currentPage ===3){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`2`, 'previous_page'),
                        Markup.button.callback(`·3·`, 'current_page'),

                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }
    }else if (countPages === 2){
        if (currentPage === 1){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`·1·`, 'current_page'),
                        Markup.button.callback(`2`, 'last_page'),
                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }else if (currentPage ===2){
            return Markup.inlineKeyboard(
                [
                    [
                        Markup.button.callback(`1`, 'first_page'),
                        Markup.button.callback(`·2·`, 'current_page'),
                    ],
                    [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                    [Markup.button.callback('<Назад', 'back')]
                ]
            )
        }
    }else if (countPages === 1){
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`·1·`, 'current_page'),
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    }else if (currentPage === 1) {
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`·1·`, 'current_page'),
                    Markup.button.callback(`2`, 'next_page'),
                    Markup.button.callback(`3`, 'third_page'),
                    Markup.button.callback(`4`, 'fourth_page'),
                    Markup.button.callback(`${countPages}>>`, 'last_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    } else if (currentPage === 2) {
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`1`, 'first_page'),
                    Markup.button.callback(`·2·`, 'current_page'),
                    Markup.button.callback(`3`, 'next_page'),
                    Markup.button.callback(`4`, 'fourth'),
                    Markup.button.callback(`${countPages}>>`, 'last_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    } else if (currentPage === 3) {
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`1`, 'first_page'),
                    Markup.button.callback(`2`, 'previous_page'),
                    Markup.button.callback(`·3·`, 'current_page'),
                    Markup.button.callback(`4`, 'next_page'),
                    Markup.button.callback(`${countPages}>>`, 'last_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    } else if (currentPage === countPages) {
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`<<1`, 'first_page'),
                    Markup.button.callback(`${currentPage - 3}`, 'fourth_back_page'),
                    Markup.button.callback(`${currentPage - 2}`, 'third_back_page'),
                    Markup.button.callback(`${currentPage - 1}`, 'previous_page'),
                    Markup.button.callback(`·${currentPage}·`, 'current_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    } else if (currentPage === countPages - 1) {
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`<<1`, 'first_page'),
                    Markup.button.callback(`${currentPage - 2}`, 'fourth_back_page'),
                    Markup.button.callback(`${currentPage - 1}`, 'previous_page'),
                    Markup.button.callback(`·${currentPage}·`, 'current_page'),
                    Markup.button.callback(`${countPages}`, 'last_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    } else if (currentPage === countPages - 2) {
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`<<1`, 'first_page'),
                    Markup.button.callback(`${currentPage - 1}`, 'previous_page'),
                    Markup.button.callback(`·${currentPage}·`, 'current_page'),
                    Markup.button.callback(`${currentPage + 1}`, 'next_page'),
                    Markup.button.callback(`${countPages}`, 'last_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    } else {
        return Markup.inlineKeyboard(
            [
                [
                    Markup.button.callback(`<<1`, 'first_page'),
                    Markup.button.callback(`${currentPage - 1}`, 'previous_page'),
                    Markup.button.callback(`·${currentPage}·`, 'current_page'),
                    Markup.button.callback(`${currentPage + 1}`, 'next_page'),
                    Markup.button.callback(`${countPages}>>`, 'last_page')
                ],
                [Markup.button.callback(`Min %: ${minSpread}`, 'min_spread')],
                [Markup.button.callback('<Назад', 'back')]
            ]
        )
    }
}


module.exports = {
    mainMenuText,
    inlineMainMenuKeyboard,
    settingsButton,
    arbitrageStartMenuText,
    arbitrageStartMenuButton,
    arbitrageBasicMenuText,
    arbitrageBasicMenuButton
}

