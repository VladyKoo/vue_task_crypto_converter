<template>
  <div class="home">
    <div class="text-center"><h1>Конвертер криптовалют</h1></div>
    <div>
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" dark v-bind="attrs" v-on="on">
            {{ coinsData[selectedCoin].id }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item-group v-model="selectedCoin" color="primary">
            <v-list-item v-for="(item, index) in coinsData" :key="index" active-class="blue--text">
              <v-list-item-title>{{ item.id + ' ' }} {{ item.name }}</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-menu>
    </div>

    <Coins :coinsData="coinsData" :graphData="graphData" />
  </div>
</template>

<script>
import Coins from '../components/Coins'
import coinGeckoApi from '../services/coinGeckoApi'
export default {
  components: { Coins },
  name: 'Home',
  data: () => ({
    coinsData: [
      { name: 'Bitcoin', id: 'BTC', price: 10, graphData: [] },
      { name: 'Ethereum', id: 'ETH', price: 20, graphData: [] },
      { name: 'US Dollar', id: 'USD', price: 30, graphData: [] },
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
          vs_currencies: ['eth', 'usd', 'btc'],
        })
        .then((data) => {
          const price = data.data
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
      console.log(price)
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
