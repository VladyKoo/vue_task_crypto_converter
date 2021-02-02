<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn style="width: 100%;" color="primary" v-bind="attrs" v-on="on">
        {{ coinsData[selectedCoin].id }}
        <v-spacer></v-spacer>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group :value="selectedCoin" @change="changeSelectedCoin($event)">
        <v-list-item v-for="item in coinsData" :key="item.name" active-class="blue--text">
          <v-list-item-title>{{ item.id + ' ' }} {{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    selectedCoin: Number,
    name: String,
  },
  computed: {
    ...mapState({
      coinsData: (state) => state.converter.coinsData,
    }),
  },
  methods: {
    changeSelectedCoin(value) {
      const payload = { selectedCoin: +value, name: this.name }
      this.$store.dispatch('changeSelectedCoin', payload)
    },
  },
}
</script>
