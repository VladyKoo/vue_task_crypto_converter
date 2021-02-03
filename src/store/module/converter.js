import CoinGeckoApi from '../../services/coinGeckoApi'

export default {
  state: {
    coinsData: [
      { name: 'Bitcoin', id: 'btc', symbol: 'bitcoin', icon: 'mdi-currency-btc' },
      { name: 'Ethereum', id: 'eth', symbol: 'ethereum', icon: 'mdi-ethereum' },
      { name: 'US Dollar', id: 'usd', symbol: 'us dollar', icon: 'mdi-currency-usd' },
    ],
    coinsInputOutputValue: {
      inputSelected: {
        num: 0,
        id: 'btc',
        symbol: 'bitcoin',
      },
      outputSelected: {
        num: 1,
        id: 'eth',
        symbol: 'ethereum',
      },
      inputSelectedCoin: 0,
      outputSelectedCoin: 0,
      inputAmount: 1,
    },
    coinsUserValue: {
      inputAmount: 1,
      inputSelected: {
        num: 0,
        id: 'btc',
        symbol: 'bitcoin',
      },
      outputSelected: {
        num: 1,
        id: 'eth',
        symbol: 'ethereum',
      },
    },
    coinsPrice: {
      bitcoin: {
        btc: 1,
        eth: 0,
        usd: 0,
      },
      ethereum: {
        btc: 0,
        eth: 1,
        usd: 0,
      },
      'us dollar': {
        btc: 0,
        eth: 0,
        usd: 1,
      },
    },
    coinsHistory: {
      labels: null,
      prices: null,
    },
  },
  getters: {},
  mutations: {
    updateSelectedCoin(state, payload) {
      console.log(payload)
      state.coinsUserValue[payload.name2].num = payload.selectedCoin
      state.coinsUserValue[payload.name2].id = state.coinsData[payload.selectedCoin].id
      state.coinsUserValue[payload.name2].symbol = state.coinsData[payload.selectedCoin].symbol
      state.coinsInputOutputValue[payload.name] = payload.selectedCoin
    },
    updateInputAmount(state, payload) {
      state.coinsInputOutputValue.inputAmount = payload
    },
    reverseDirection(state) {
      const coinsValue = state.coinsInputOutputValue.inputSelectedCoin
      state.coinsInputOutputValue.inputSelectedCoin = state.coinsInputOutputValue.outputSelectedCoin
      state.coinsInputOutputValue.outputSelectedCoin = coinsValue
    },
    updateCoinsPrice(state, payload) {
      state.coinsPrice = payload
    },
    updateCoinsHistory(state, payload) {
      state.coinsHistory = payload
    },
  },
  actions: {
    changeSelectedCoin({ commit }, payload) {
      commit('updateSelectedCoin', payload)
    },
    changeInputAmount({ commit }, payload) {
      commit('updateInputAmount', payload)
    },
    getSimplePrice({ commit }) {
      CoinGeckoApi.getSimplePrice().then((data) => {
        commit('updateCoinsPrice', data)
      })
    },
    getHistoryPrice({ commit, state }) {
      const id = state.coinsData[state.coinsInputOutputValue.inputSelectedCoin].name.toLowerCase()
      const symbol = state.coinsData[
        state.coinsInputOutputValue.outputSelectedCoin
      ].id.toLowerCase()

      CoinGeckoApi.getHistoryPrice(id, symbol).then((data) => {
        const copyData = data.slice()
        const coinsHistory = {
          labels: [],
          prices: [],
        }
        copyData.forEach((elem) => {
          coinsHistory.labels.push(elem.labelData)
          coinsHistory.prices.push(elem.price)
        })

        commit('updateCoinsHistory', coinsHistory)
      })
    },
    getHistory({ commit, state }) {
      const id = state.coinsData[state.coinsInputOutputValue.inputSelectedCoin].name.toLowerCase()
      const symbol = state.coinsData[
        state.coinsInputOutputValue.outputSelectedCoin
      ].id.toLowerCase()

      CoinGeckoApi.getHistory(id, symbol).then((data) => {
        console.log(data)
        commit('updateCoinsHistory', data)
      })
    },
  },
}
