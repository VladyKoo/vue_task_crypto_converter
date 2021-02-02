export default {
  state: {
    coinsData: [
      { name: 'Bitcoin', id: 'BTC', icon: 'mdi-currency-btc' },
      { name: 'Ethereum', id: 'ETH', icon: 'mdi-ethereum' },
      { name: 'US Dollar', id: 'USD', icon: 'mdi-currency-usd' },
    ],
    coinsInputOutputValue: {
      inputSelectedCoin: 0,
      outputSelectedCoin: 1,
      inputAmount: 1,
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
    currentCoin: 'ethereum',
    coinsHistory: {
      labels: [
        '26.01',
        '27.01',
        '28.01',
        '29.01',
        '30.01',
        '26.01',
        '27.01',
        '28.01',
        '29.01',
        '30.01',
        '26.01',
        '27.01',
        '28.01',
        '29.01',
      ],
      prices: [10, 200, 100, 400, 400, 5, 10, 5, 10, 200, 100, 200, 100, 400],
    },
  },
  getters: {},
  mutations: {
    updateSelectedCoin(state, payload) {
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
    changeCoinsPrice({ commit }, payload) {
      commit('updateCoinsPrice', payload)
    },
    changeCoinsHistory({ commit }, payload) {
      commit('updateCoinsHistory', payload)
    },
  },
}
