const CoinGeckoApi = require('coingecko-api')
const CG = new CoinGeckoApi()

const coinSymbol = ['btc', 'eth', 'usd']
const coinId = ['bitcoin', 'ethereum']

const getDateArray = function() {
  let UTC = Date.now()
  let dateArray = []

  for (let i = 0; i < 14; i++) {
    const localData = new Date(UTC)
    dateArray.push({
      fullDate: `${localData.getDate()}-${localData.getMonth() + 1}-${localData.getFullYear()}`,
      labelData: `${localData.getDate() < 10 ? '0' + localData.getDate() : localData.getDate()}.${
        localData.getMonth() < 10 ? '0' + (localData.getMonth() + 1) : localData.getMonth()
      }`,
    })
    UTC -= 86400000
  }
  return dateArray.reverse()
}

export default {
  getSimplePrice() {
    return CG.simple
      .price({
        ids: coinId,
        vs_currencies: coinSymbol,
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
  getHistoryPrice() {   
    const dateArray = getDateArray()


    Promise.all((resolve, reject)=>{
    })

    Promise.all()



    dateArray.map((elem) => {
      return CG.coins
        .fetchHistory(coinId[0], { date: elem.fullDate, localization: false })
        .then((data) => {
          dateArray.forEach((el)=>{
             if (el.fullDate === elem.fullDate ) return elem.price = data.data.market_data.current_price.[coinSymbol[2]]
          })
          return dateArray
        })
    })

    // return dateArray

  },
}
