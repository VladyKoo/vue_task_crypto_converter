const CoinGeckoApi = require('coingecko-api')
const CG = new CoinGeckoApi()

const coinSymbol = ['bitcoin', 'ethereum', 'us dollar']
const coinId = ['btc', 'eth', 'usd']

function processing(array = [], func) {
  const coinsHistory = {
    labels: [],
    prices: [],
  }
  array.forEach((elem) => {
    const localData = new Date(elem[0])
    const data = `${localData.getDate() < 10 ? '0' + localData.getDate() : localData.getDate()}/${
      localData.getMonth() < 10 ? '0' + (localData.getMonth() + 1) : localData.getMonth() + 1
    } ${localData.getHours() < 10 ? '0' + localData.getHours() : localData.getHours()}:${
      localData.getMinutes() < 10 ? '0' + localData.getMinutes() : localData.getMinutes()
    }`

    coinsHistory.labels.push(data)
    coinsHistory.prices.push(func(elem[1].toFixed(8)))
  })

  return coinsHistory
}

export default {
  /* 
  
  */
  getSimplePrice() {
    return CG.simple
      .price({
        ids: coinSymbol,
        vs_currencies: coinId,
      })
      .then((data) => {
        const price = data.data
        if (price.bitcoin && price.ethereum) {
          price['us dollar'] = {
            eth: +(1 / price.ethereum.usd).toFixed(8),
            btc: +(1 / price.bitcoin.usd).toFixed(8),
            usd: 1,
          }
          return price
        } else {
          console.error('Data is not accept')
          return null
        }
      })
  },
  /* 
 
  */
  getHistory(symbol = 'bitcoin', id = 'btc') {
    if (symbol === coinSymbol[2]) {
      if (id === coinId[0]) {
        return CG.coins
          .fetchMarketChart('bitcoin', {
            vs_currency: coinId[2],
            days: 14,
          })
          .then((data) => processing(data.data.prices, (value) => 1 / value))
      }
      if (id === coinId[1]) {
        return CG.coins
          .fetchMarketChart('ethereum', {
            vs_currency: coinId[2],
            days: 14,
          })
          .then((data) => processing(data.data.prices, (value) => 1 / value))
      }
      if (id === coinId[2]) {
        return CG.coins
          .fetchMarketChart('ethereum', {
            vs_currency: coinId[1],
            days: 14,
          })
          .then((data) => processing(data.data.prices, (value) => value))
      }
    }
    return CG.coins
      .fetchMarketChart(symbol, {
        vs_currency: id,
        days: 14,
      })
      .then((data) => processing(data.data.prices, (value) => value))
  },
}
