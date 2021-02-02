<template>
  <div class="home">
    <div class="text-center"><h1>Конвертер криптовалют</h1></div>
    <v-row>
      <v-col align-self="center">
        <CoinCard></CoinCard>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <Graph :coinsHistory="coinsHistory"></Graph>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CoinCard from '../components/CoinCard'
import Graph from '../components/Graph.vue'
import CoinGeckoApi from '../services/coinGeckoApi'
import { mapState } from 'vuex'
export default {
  components: { CoinCard, Graph },
  name: 'Home',
  data: () => ({}),
  computed: {
    ...mapState({
      coinsHistory: (state) => state.converter.coinsHistory,
      currentCoin: (state) => state.converter.currentCoin,
    }),
  },
  methods: {},
  mounted() {
    CoinGeckoApi.getSimplePrice().then((data) => {
      this.$store.dispatch('changeCoinsPrice', data)
    })
    console.log(CoinGeckoApi.getHistoryPrice())

    // const promise = new Promise((resolve, reject) => {
    //   const data = CoinGeckoApi.getHistoryPrice()
    //   if (data) resolve(data)
    //   else reject('data undefind')
    // })

    // promise
    //   .then((data) => {
    //     console.log(data)
    //     const copyData = data.slice()
    //     // const coinsHistory = {
    //     //   labels: [],
    //     //   prices: [],
    //     // }
    //     // copyData.forEach((elem) => {
    //     //   coinsHistory.labels.push(elem.labelData)
    //     //   coinsHistory.prices.push(1)
    //     //   console.log(elem)
    //     // })

    //     console.log(copyData.price)

    //     // this.$store.dispatch('changeCoinsHistory' )
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
  },
}
</script>
