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
      { name: 'Bitcoin', id: 'BTC', price: 10 },
      { name: 'Ethereum', id: 'ETH', price: 20 },
      { name: 'US Dollar', id: 'USD', price: 30 },
    ],
    selectedCoin: 0,
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
    ping: async () => {
      return await coinGeckoApi.ping()
    },
    exchangeRates: async () => {
      return await coinGeckoApi.exchangeRates()
    },
    simple: async () => {
      return await coinGeckoApi.simple.price({
        ids: ['bitcoin', 'ethereum'],
        vs_currencies: ['eth', 'usd', 'btc'],
      })
    },
  },
  mounted() {
    this.simple().then((data) => {
      console.log(data)
    })
  },
}
</script>
