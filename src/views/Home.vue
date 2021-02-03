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
        <v-card class="mx-auto" max-width="900" elevation="7">
          <LineChart></LineChart>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import CoinCard from '../components/CoinCard'
import { mapState } from 'vuex'
import LineChart from '../components/LineChart.vue'
export default {
  components: { CoinCard, LineChart },
  name: 'Home',
  data: () => ({}),
  computed: {
    ...mapState({
      coinsData: (state) => state.converter.coinsData,
      coinsInputOutputValue: (state) => state.converter.coinsInputOutputValue,
    }),
  },
  mounted() {
    this.$store.dispatch('getSimplePrice')
    // this.$store.dispatch('getHistoryPrice')
    this.$store.dispatch('getHistory')
  },
}
</script>
