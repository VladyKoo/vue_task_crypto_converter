<template>
  <v-simple-table dense>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            ID
          </th>
          <th class="text-left">
            Name
          </th>
          <th class="text-left">
            Price
          </th>
          <th class="text-left">
            Graph last 14 Days
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, idx) in coinsData" :key="idx">
          <td>{{ coin.id }}</td>
          <td>{{ coin.name }}</td>
          <td>{{ coin.price }}</td>
          <td><Graph :graphData="graphData" /></td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import Graph from '../components/Graph'
export default {
  props: {
    coinsData: Array,
    graphData: Object,
  },
  components: { Graph },
}
</script>

<style></style>
