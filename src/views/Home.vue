<template>
  <div class="home">
    <div class="text-center"><h1>Конвертер криптовалют</h1></div>

    <v-container style="width: 60%">
      <v-row no-gutters>
        <v-col>
          <CoinMenu></CoinMenu>
        </v-col>
        <v-col md="auto" align-self="center">
          <v-btn>
            <v-icon icon color="primary">mdi-swap-horizontal-bold</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <CoinMenu></CoinMenu>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="spacing-playground px-auto">
      <Graph :graphData="graphData"></Graph>
    </v-container>
  </div>
</template>

<script>
import CoinMenu from '../components/CoinMenu.vue'
import Graph from '../components/Graph.vue'
import coinGeckoApi from '../services/coinGeckoApi'
export default {
  components: { CoinMenu, Graph },
  name: 'Home',
  data: () => ({
    coinsData: [
      { name: 'Bitcoin', id: 'BTC', price: null },
      { name: 'Ethereum', id: 'ETH', price: null },
      { name: 'US Dollar', id: 'USD', price: null },
    ],
    selectedCoin: 0,
    getPriceData: {},
    graphData: {
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
      value: [10, 200, 100, 400, 5, 10, 200, 100, 400, 5, 10, 200, 100, 400],
    },
  }),
  methods: {
    exchangeRates: async () => {
      return await coinGeckoApi.exchangeRates()
    },

    getSimplePrice() {
      return coinGeckoApi.simple
        .price({
          ids: ['bitcoin', 'ethereum'],
          vs_currencies: ['btc', 'eth', 'usd', 'rub'],
        })
        .then((data) => {
          const price = data.data
          console.log(price)

          price['us dollar'] = {
            eth: +(1 / price.ethereum.usd).toFixed(8),
            btc: +(1 / price.bitcoin.usd).toFixed(8),
            usd: 1,
          }
          return price
        })
    },
    computedPrice() {
      // console.log(this.getPriceData)

      const price = this.getPriceData[this.coinsData[this.selectedCoin].name.toLowerCase()]
      // console.log(price)
      this.coinsData.forEach((elem) => {
        elem.price = price[elem.id.toLowerCase()]
      })
    },
  },
  mounted() {
    this.getSimplePrice().then((data) => {
      this.getPriceData = data
      this.computedPrice()
    })
  },
  watch: {
    selectedCoin() {
      console.log('asfdasdf')
      this.computedPrice()
    },
  },
}
</script>
