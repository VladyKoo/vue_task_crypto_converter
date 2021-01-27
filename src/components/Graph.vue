<template>
  <v-card class="my-2" max-width="600">
    <v-sparkline
      :labels="graph.labels"
      :value="graph.value"
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
    graphData: Object,
  },
  computed: {
    graph() {
      if (this.graphData) return this.graphData
      else return {}
    },
  },
}
</script>
