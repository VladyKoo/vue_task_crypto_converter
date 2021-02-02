<template>
  <v-card class=" mx-auto" max-width="800" elevation="5">
    <v-sparkline
      :labels="coinsHistory.labels"
      :value="coinsHistory.prices"
      color="green"
      line-width="2"
      padding="16"
      height="80"
    ></v-sparkline>
  </v-card>
</template>

<script>
export default {
  props: {
    coinsHistory: Object,
  },
}
</script>
