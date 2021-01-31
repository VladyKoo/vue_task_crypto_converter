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
          <th class="text-left price">
            Price
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(coin, idx) in coinsData" :key="idx">
          <td>{{ coin.id }}</td>
          <td>{{ coin.name }}</td>
          <td>{{ coin.price }}</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  props: {
    coinsData: Array,
    graphData: Object,
  },
}
</script>

<style>
.price {
  width: 400px;
}
</style>
