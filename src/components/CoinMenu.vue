<template>
  <v-menu offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn style="width: 100%;" color="primary" v-bind="attrs" v-on="on">
        {{ userValue[name].id | upperCase }}
        <v-spacer></v-spacer>
        <v-icon>mdi-chevron-down</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item-group :value="userValue[name].num" @change="changeSelectedCoin($event)">
        <v-list-item v-for="item in coinsData" :key="item.name" active-class="blue--text">
          <v-list-item-title>
            <span class="mr-2">{{ item.id | upperCase }}</span>
            <span>{{ item.name }}</span>
          </v-list-item-title>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    name: String,
  },
  computed: {
    ...mapState({
      coinsData: (state) => state.converter.coinsData,
      userValue: (state) => state.converter.userValue,
    }),
  },
  methods: {
    changeSelectedCoin(value) {
      const payload = { selectedCoin: +value, name: this.name }
      this.$store.dispatch('changeSelectedCoin', payload)
    },
  },
  updated() {
    this.$store.dispatch('getHistory')
  },
  filters: {
    upperCase(value) {
      return value.toUpperCase()
    },
  },
}
</script>
