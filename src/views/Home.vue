<template>
  <div class="home">
    <div class="text-center mb-8"><h1>Конвертер криптовалют</h1></div>
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
import { mapState } from 'vuex'
import CoinCard from '../components/converter/CoinCard'
import LineChart from '../components/converter/LineChart'
export default {
  components: { CoinCard, LineChart },
  name: 'Home',
  data: () => ({}),
  computed: {
    ...mapState({
      coinsData: (state) => state.converter.coinsData,
    }),
  },
  mounted() {
    this.$store.dispatch('getSimplePrice')
    this.$store.dispatch('getHistory')
  },
}
</script>
