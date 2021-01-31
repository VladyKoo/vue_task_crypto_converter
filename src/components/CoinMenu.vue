<template>
  <v-container>
    <v-sheet elevation="12" class="pa-5" height="auto" width="100%">
      <v-row>
        <v-col>
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                style="width: 100%;"
                color="primary"
                v-bind="attrs"
                v-on="on"
                @click="show = !show"
              >
                {{ coinsData[selectedCoin].id }}
                <v-spacer></v-spacer>
                <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item-group v-model="selectedCoin">
                <v-list-item
                  v-for="(item, index) in coinsData"
                  :key="index"
                  active-class="blue--text"
                >
                  <v-list-item-title>{{ item.id + ' ' }} {{ item.name }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field
            type="number"
            v-model="inputValue"
            :rules="[rules.required, rules.numbers]"
            label="Amount"
          >
            <v-icon slot="prepend" color="primary">
              {{ coinsData[selectedCoin].icon }}
            </v-icon>
          </v-text-field>
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
export default {
  props: {},
  data: () => ({
    show: false,
    coinsData: [
      { name: 'Bitcoin', id: 'BTC', icon: 'mdi-currency-btc', price: null },
      { name: 'Ethereum', id: 'ETH', icon: 'mdi-ethereum', price: null },
      { name: 'US Dollar', id: 'USD', icon: 'mdi-currency-usd', price: null },
    ],
    selectedCoin: 0,
    inputValue: 1,
    rules: {
      required: (value) => !!value || 'Required.',
      numbers: (value) => value.length <= 20 || 'Max 20 characters',
    },
  }),
}
</script>

<style></style>
