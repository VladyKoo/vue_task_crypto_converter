import CoinGeckoApi from '../../services/coinGeckoApi'

export default {
  state: {
    coinsData: [
      { name: 'Bitcoin', id: 'btc', symbol: 'bitcoin', icon: 'mdi-currency-btc' },
      { name: 'Ethereum', id: 'eth', symbol: 'ethereum', icon: 'mdi-ethereum' },
      { name: 'US Dollar', id: 'usd', symbol: 'us dollar', icon: 'mdi-currency-usd' },
    ],
    userValue: {
      inputAmount: 1,
      inputSelected: {
        num: 0,
        id: 'btc',
        symbol: 'bitcoin',
      },
      outputSelected: {
        num: 0,
        id: 'btc',
        symbol: 'bitcoin',
      },
    },
    coinsPrice: {
      bitcoin: {
        btc: null,
        eth: null,
        usd: null,
      },
      ethereum: {
        btc: null,
        eth: null,
        usd: null,
      },
      'us dollar': {
        btc: null,
        eth: null,
        usd: null,
      },
    },
    coinsHistory: {
      labels: null,
      prices: null,
    },
  },
  mutations: {
    updateSelectedCoin(state, payload) {
      state.userValue[payload.name].num = payload.selectedCoin
      state.userValue[payload.name].id = state.coinsData[payload.selectedCoin].id
      state.userValue[payload.name].symbol = state.coinsData[payload.selectedCoin].symbol
    },
    updateInputAmount(state, payload) {
      state.userValue.inputAmount = payload
    },
    reverseDirection(state) {
      const coinsValue = state.userValue.inputSelected
      state.userValue.inputSelected = state.userValue.outputSelected
      state.userValue.outputSelected = coinsValue
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
    getHistory({ commit, state }) {
      const symbol = state.userValue.inputSelected.symbol
      const id = state.userValue.outputSelected.id

      CoinGeckoApi.getHistory(symbol, id).then((data) => {
        commit('updateCoinsHistory', data)
      })
    },
  },
}
