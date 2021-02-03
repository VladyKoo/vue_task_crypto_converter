const CoinGeckoApi = require('coingecko-api')
const CG = new CoinGeckoApi()

const coinSymbol = ['btc', 'eth', 'usd']
const coinId = ['bitcoin', 'ethereum', 'us dollar']

// const getDateArray = function() {
//   let UTC = Date.now()
//   let dateArray = []

//   for (let i = 0; i < 14; i++) {
//     const localData = new Date(UTC)
//     dateArray.push({
//       fullDate: `${localData.getDate()}-${localData.getMonth() + 1}-${localData.getFullYear()}`,
//       labelData: `${localData.getDate() < 10 ? '0' + localData.getDate() : localData.getDate()}.${
//         localData.getMonth() < 10 ? '0' + (localData.getMonth() + 1) : localData.getMonth()
//       }`,
//     })
//     UTC -= 86400000
//   }
//   return dateArray.reverse()
// }

export default {
  /* 
  
  */
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
  /* 
 
  */
  getHistory(id = 'bitcoin', symbol = 'btc') {
    if (id === coinId[2]) {
      if (symbol === coinSymbol[0]) {
        return CG.coins
          .fetchMarketChart(id, {
            vs_currency: symbol,
            days: 14,
          })
          .then((data) => {
            const coinsHistory = {
              labels: [],
              prices: [],
            }
            data.data.prices.forEach((elem) => {
              const localData = new Date(elem[0])
              const data = `${
                localData.getDate() < 10 ? '0' + localData.getDate() : localData.getDate()
              }/${
                localData.getMonth() < 10
                  ? '0' + (localData.getMonth() + 1)
                  : localData.getMonth() + 1
              } ${localData.getHours() < 10 ? '0' + localData.getHours() : localData.getHours()}:${
                localData.getMinutes() < 10 ? '0' + localData.getMinutes() : localData.getMinutes()
              }`

              coinsHistory.labels.push(data)
              coinsHistory.prices.push(elem[1].toFixed(8))
            })

            return coinsHistory
          })
      }
    }

    ///
    ///
    ///
    ///
    ///
    ///
    ///
    ///
    ///
    ///

    return CG.coins
      .fetchMarketChart(id, {
        vs_currency: symbol,
        days: 14,
      })
      .then((data) => {
        const coinsHistory = {
          labels: [],
          prices: [],
        }
        data.data.prices.forEach((elem) => {
          const localData = new Date(elem[0])
          const data = `${
            localData.getDate() < 10 ? '0' + localData.getDate() : localData.getDate()
          }/${
            localData.getMonth() < 10 ? '0' + (localData.getMonth() + 1) : localData.getMonth() + 1
          } ${localData.getHours() < 10 ? '0' + localData.getHours() : localData.getHours()}:${
            localData.getMinutes() < 10 ? '0' + localData.getMinutes() : localData.getMinutes()
          }`
          // const data = `${localData.getDate()}-${localData.getMonth() + 1}`

          coinsHistory.labels.push(data)
          coinsHistory.prices.push(elem[1].toFixed(8))
        })

        return coinsHistory
      })
  },
}
