<template>
  <div class="porfolio">
    <h1 class="text-center mb-8">Криптовалютный портфель</h1>
    <v-sheet class="mx-auto" max-width="300">
      <DoughnutChart></DoughnutChart>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DoughnutChart from '../components/portfolio/DoughnutChart'

export default {
  components: { DoughnutChart },
  name: 'Portfolio',
  data: () => ({}),
  computed: {
    ...mapState({}),
  },
  mounted() {},
}
</script>
