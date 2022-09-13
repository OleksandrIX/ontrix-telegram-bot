const fs = require('fs')
const axios = require('axios')
const BigDecimal = require('js-big-decimal')

const currenciesName = JSON.parse(fs.readFileSync(__dirname + '/exchanges/Exchanges.json', 'utf-8'))
const url = 'https://api.kraken.com/0/public/Ticker?pair=BTCUSDT,DOTUSDT,LINKUSDT,USTUSDT,ADAUSDT,DAIUSDT,EOSUSDT,LTCUSDT,XRPUSDT,BCHUSDT,DOGEUSDT,ETHUSDT,USDCUSDT'
let arrayTickers = []

async function exmo() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api.exmo.com/v1.1/ticker')).data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/exmo.json'))
            const tickersKey = Object.keys(tickersPromise)
            const link = 'https://exmo.com/uk/trade/', exchange = 'EXMO', tickers = []
            let name, nameLink
            for (let key of tickersKey) {
                name = key.substring(key.search('_') + 1, key.length)
                if (name === 'USDT' || name === 'USD') {
                    let ticker = tickersPromise[key]
                    nameLink = key
                    name = key.split('_').join('/')
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.sell_price, ticker.buy_price, exchange, link, nameLink))
                }
            }
            // console.log('EXMO completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function kucoin() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = await axios.get('https://api.kucoin.com/api/v1/market/allTickers')
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/kucoin.json'))
            const tickersList = tickersPromise.data.data['ticker']
            const link = 'https://www.kucoin.com/ru/trade/', exchange = 'Kucoin', tickers = []
            let name, nameLink
            for (let ticker of tickersList) {
                name = ticker.symbol.substring(ticker.symbol.search('-') + 1, ticker.symbol.length)
                if (name === 'USDT') {
                    name = ticker.symbol.split('-').join('/')
                    nameLink = ticker.symbol
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.buy, ticker.sell, exchange, link, nameLink))
                }
            }
            // console.log('Kucoin completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function mexc() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = await axios.get('https://www.mexc.com/open/api/v2/market/ticker')
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/mxc.json'))
            const tickersList = tickersPromise.data.data
            const link = 'https://www.mexc.com/ru-RU/exchange/', exchange = 'Mexc', tickers = []
            let name, nameLink
            for (let ticker of tickersList) {
                name = ticker.symbol.substring(ticker.symbol.search('_') + 1, ticker.symbol.length)
                if (name === 'USDT') {
                    name = ticker.symbol.split('_').join('/')
                    nameLink = ticker.symbol
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.bid, ticker.ask, exchange, link, nameLink))
                }
            }
            // console.log('MEXC completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function whiteBit() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://whitebit.com/api/v1/public/tickers')).data.result
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/whitebit.json'))
            let keys = Object.keys(tickersPromise)
            const link = 'https://whitebit.com/ua/trade/', exchange = 'WhiteBit', tickers = []
            let name, nameLink
            for (let key of keys) {
                name = key.substring(key.search('_') + 1, key.length)
                if (name === 'USD' || name === 'USDT') {
                    name = key.split('_').join('/')
                    nameLink = key
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, tickersPromise[key].ticker.ask, tickersPromise[key].ticker.bid, exchange, link, nameLink))
                }
            }
            // console.log('WhiteBit completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function huobi() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api.huobi.pro/market/tickers')).data.data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/huobi-global.json'))
            const link = 'https://www.huobi.com/ru-ru/exchange/', exchange = 'Huobi', tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                name = ticker.symbol.substring(ticker.symbol.length - 4, ticker.symbol.length)
                if (name === 'usdt') {
                    nameLink = ticker.symbol.substring(0, ticker.symbol.length - 4) + '_' + name
                    name = ticker.symbol.substring(0, ticker.symbol.length - 4).toUpperCase() + '/' + name.toUpperCase()
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.ask, ticker.bid, exchange, link, nameLink))
                }
            }
            // console.log('Huobi completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function kraken() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get(url)).data.result
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/kraken.json'))
            const keys = Object.keys(tickersPromise)
            const link = 'https://trade.kraken.com/ru-ru/charts/KRAKEN:', exchange = 'Kraken', tickers = []
            let name, nameLink
            for (let key of keys) {
                if (key === 'XDGUSDT') {
                    name = key.substring(0, key.length - 4) + '/' + key.substring(key.length - 4, key.length)
                    nameLink = 'DOGE-' + key.substring(key.length - 4, key.length)
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    tickers.push(createTicker(name, currency, tickersPromise[key].a[0], tickersPromise[key].b[0], exchange, link, nameLink))
                } else if (key === 'XBTUSDT') {
                    name = key.substring(0, key.length - 4) + '/' + key.substring(key.length - 4, key.length)
                    nameLink = 'BTC-' + key.substring(key.length - 4, key.length)
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    tickers.push(createTicker(name, currency, tickersPromise[key].a[0], tickersPromise[key].b[0], exchange, link, nameLink))
                } else {
                    name = key.substring(0, key.length - 4) + '/' + key.substring(key.length - 4, key.length)
                    nameLink = key.substring(0, key.length - 4) + '-' + key.substring(key.length - 4, key.length)
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    tickers.push(createTicker(name, currency, tickersPromise[key].a[0], tickersPromise[key].b[0], exchange, link, nameLink))
                }
            }
            // console.log('Kraken completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function okx() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://www.okx.com/api/v5/market/tickers?instType=SPOT')).data.data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/okx.json'))
            const link = 'https://www.okx.com/ru/trade-spot/', exchange = 'OKX', tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                name = ticker.instId.substring(ticker.instId.search('-') + 1, ticker.instId.length)
                if (name === 'USDT') {
                    let names = ticker.instId.split('-')
                    nameLink = names[0].toLowerCase() + '-' + names[1].toLowerCase()
                    name = names.join('/')
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.bidPx, ticker.askPx, exchange, link, nameLink))
                }
            }
            // console.log('OKX completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function gate() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api.gateio.ws/api/v4/spot/tickers')).data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/gate-io.json'))
            const link = 'https://www.gate.io/ru/trade/', exchange = 'Gate.io', tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                name = ticker.currency_pair.substring(ticker.currency_pair.search('_') + 1, ticker.currency_pair.length)
                if (name === 'USDT' || name === 'USD') {
                    nameLink = ticker.currency_pair
                    name = ticker.currency_pair.split('_').join('/')
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.highest_bid, ticker.lowest_ask, exchange, link, nameLink))
                }
            }
            // console.log('Gate.io completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function hitbtc() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api.hitbtc.com/api/3/public/ticker')).data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/hitbtc.json'))
            const keys = Object.keys(tickersPromise)
            const link = 'https://hitbtc.com/', exchange = 'HitBTC', tickers = []
            let name, nameLink
            for (let key of keys) {
                if (key.substring(key.length - 4, key.length) !== 'PERP') {
                    name = key.substring(key.length - 4, key.length)
                    if (name === 'USDT') {
                        nameLink = key.substring(0, key.length - 4).toLowerCase() + '-to-' + name.toLowerCase()
                        name = key.substring(0, key.length - 4) + '/' + name
                        const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                        if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, tickersPromise[key].bid, tickersPromise[key].ask, exchange, link, nameLink))
                    }
                }
            }
            // console.log('HitBTC completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function lbank() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api.lbkex.com/v1/ticker.do?symbol=all')).data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/lbank.json'))
            const link = 'https://www.lbank.info/exchange/', exchange = 'Lbank', tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                name = ticker.symbol.substring(ticker.symbol.length - 4, ticker.symbol.length)
                if (name === 'usdt') {
                    nameLink = ticker.symbol.substring(0, ticker.symbol.search('_')) + '/' + name
                    name = nameLink.toUpperCase()
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.ticker.latest, ticker.ticker.latest, exchange, link, nameLink))
                }
            }
            // console.log('Lbank completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function ftx() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://ftx.com/api/markets')).data.result
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/ftx.json'))
            const link = 'https://ftx.com/trade/', exchange = 'FTX', tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                if (ticker.type === 'spot') {
                    if (ticker.quoteCurrency === 'USDT' || ticker.quoteCurrency === 'USD') {
                        nameLink = ticker.name
                        name = ticker.name
                        const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                        if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.bid, ticker.ask, exchange, link, nameLink))
                    }
                }
            }
            // console.log('FTX completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function bitmart() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api-cloud.bitmart.com/spot/v1/ticker')).data.data.tickers
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/bitmart.json'))
            const link = 'https://www.bitmart.com/trade/ru/margin?layout=basic&symbol=', exchange = 'BitMart',
                tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                name = ticker.symbol.substring(ticker.symbol.length - 4, ticker.symbol.length)
                if (name === 'USDT') {
                    let names = ticker.symbol.split('_')
                    nameLink = ticker.symbol
                    name = names.join('/')
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.best_bid, ticker.best_ask, exchange, link, nameLink))
                }
            }
            // console.log('BitMart completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function binance() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api.binance.com/api/v3/ticker/bookTicker')).data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/binance.json'))
            const link = 'https://www.binance.com/ru-UA/trade/', exchange = 'Binance', tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                name = ticker.symbol.substring(ticker.symbol.length - 4, ticker.symbol.length)
                if (name === 'USDT') {
                    nameLink = ticker.symbol.substring(0, ticker.symbol.length - 4) + '_' + name
                    name = ticker.symbol.substring(0, ticker.symbol.length - 4) + '/' + name
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.bidPrice, ticker.askPrice, exchange, link, nameLink))
                }
            }
            // console.log('Binance completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function cointiger() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://www.cointiger.com/exchange/api/public/market/detail')).data
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/cointiger.json'))
            const keys = Object.keys(tickersPromise)
            const link = 'https://www.cointiger.com/ru-ru/#/trade_center?coin=', exchange = 'CoinTiger', tickers = []
            let name, nameLink
            for (let key of keys) {
                name = key.substring(key.length - 4, key.length)
                if (name === 'USDT' && !key.substring(0, key.length - 4).includes('$')) {
                    nameLink = key.substring(0, key.length - 4).toLowerCase() + '_' + name.toLowerCase()
                    name = key.substring(0, key.length - 4) + '/' + name
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, tickersPromise[key].highestBid, tickersPromise[key].lowestAsk, exchange, link, nameLink))
                }
            }
            // console.log('CoinTiger completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

async function bybit() {
    return new Promise(async (resolve, reject) => {
        try {
            const tickersPromise = (await axios.get('https://api.bybit.com/v2/public/tickers')).data.result
            const currencies = JSON.parse(fs.readFileSync(__dirname + '/exchanges/bybit.json'))
            const link = 'https://www.bybit.com/uk-UA/trade/spot/', exchange = 'Bybit', tickers = []
            let name, nameLink
            for (let ticker of tickersPromise) {
                if (ticker.symbol.substring(ticker.symbol.length - 4, ticker.symbol.length) === 'USDT') {
                    nameLink = ticker.symbol.substring(0, ticker.symbol.length - 4) + '/' + ticker.symbol.substring(ticker.symbol.length - 4, ticker.symbol.length)
                    name = nameLink
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.bid_price, ticker.ask_price, exchange, link, nameLink))
                } else if (ticker.symbol.substring(ticker.symbol.length - 3, ticker.symbol.length) === 'USD') {
                    nameLink = ticker.symbol.substring(0, ticker.symbol.length - 3) + '/' + ticker.symbol.substring(ticker.symbol.length - 3, ticker.symbol.length)
                    name = nameLink
                    const currency = currencies.currencies.find(el => el.name === name.substring(0, name.search('/')))?.fullName
                    if (name.search(/\d/) === -1) tickers.push(createTicker(name, currency, ticker.bid_price, ticker.ask_price, exchange, link, nameLink))
                }
            }
            // console.log('Bybit completed')
            resolve(tickers)
        } catch (e) {
            console.error(e)
        }
    })
}

const arrayPromise = [exmo, kucoin, mexc, whiteBit, huobi, kraken, okx, gate, hitbtc, lbank, ftx, bitmart, binance, cointiger, bybit]

function createTicker(name, defaultCurrency, buyPrice, sellPrice, exchange, link, nameLink) {
    const currenciesKeys = Object.keys(currenciesName)
    let currency = ''
    if (defaultCurrency === undefined) {
        for (let currenciesKey of currenciesKeys) {
            for (let elem of currenciesName[currenciesKey].currencies) {
                if (currency === '') {
                    if (elem.name === name.substring(0, name.search('/'))) currency = elem.fullName
                } else {
                    break
                }
            }
            if (currency !== '') break
        }
    } else {
        currency = defaultCurrency
    }
    return {
        name: name,
        description: currency,
        price: {
            buyPrice: buyPrice,
            sellPrice: sellPrice
        },
        exchange: exchange,
        link: link + nameLink
    }
}

function creatObjectTelegram(buyTicker, sellTicker, spread) {
    if (spread !== Infinity && buyTicker.description !== undefined && sellTicker.description !== undefined) {
        return ({
            spreadN: spread,
            spread: `${spread.toFixed(2)}%`,
            buyTicker: {
                exchange: buyTicker.exchange,
                nameTicker: buyTicker.name,
                price: new BigDecimal(parseFloat(buyTicker.price.buyPrice)).getValue(),
                linkOnTicker: buyTicker.link,
                fullNameTicker: buyTicker.description
            },
            sellTicker: {
                exchange: sellTicker.exchange,
                nameTicker: sellTicker.name,
                price: new BigDecimal(parseFloat(sellTicker.price.sellPrice)).getValue(),
                linkOnTicker: sellTicker.link,
                fullNameTicker: sellTicker.description
            }
        })
    }
}

function compare(array1, array2) {
    for (let i of array1) {
        for (let j of array2) {
            if (i.name === j.name && i.description === j.description) {
                addInArray(i, j)
            }
        }
    }
}

function addInArray(ticker1, ticker2) {
    let spread
    if (ticker2.price.sellPrice - ticker1.price.buyPrice > 0) {
        spread = ticker2.price.sellPrice - ticker1.price.buyPrice
        spread = (spread * 100) / (ticker1.price.buyPrice)
        arrayTickers.push(creatObjectTelegram(ticker1, ticker2, spread))
    }
    if (ticker1.price.sellPrice - ticker2.price.buyPrice > 0) {
        spread = ticker1.price.sellPrice - ticker2.price.buyPrice
        spread = (spread * 100) / (ticker2.price.buyPrice)
        arrayTickers.push(creatObjectTelegram(ticker2, ticker1, spread))
    }
}

const startParsingTickers = async () => {
    await Promise.all(arrayPromise.map(x => x.call()))
        .then((data) => {
            arrayTickers = []
            for (let i = 0; i < data.length - 1; i++) {
                for (let j = i + 1; j < data.length; j++) {
                    compare(data[i], data[j])
                }
            }
            arrayTickers = arrayTickers.sort((x, y) => y.spreadN - x.spreadN).filter(el => el?.spreadN < 100)
            console.log('Parsing complete')
            // console.log(data)
            // console.log(arrayTickers.length)
        })
        .catch((e) => {
            console.error(e)
        })
    return arrayTickers
}

module.exports = {startParsingTickers}

