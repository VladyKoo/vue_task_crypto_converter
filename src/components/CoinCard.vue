<template>
  <div>
    <v-sheet class="d-flex justify-center align-center" height="100%">
      <v-card class="ma-5 pa-5" min-width="200px" max-width="600px" elevation="5">
        <v-row>
          <v-col>
            <CoinMenu
              name="inputSelectedCoin"
              :selectedCoin="coinsInputOutputValue.inputSelectedCoin"
            ></CoinMenu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              :value="coinsInputOutputValue.inputAmount"
              @input="changeInputAmount($event)"
              :rules="[rules.required, rules.negative]"
              label="Количество"
              min="0"
              clearable
            >
              <v-icon slot="prepend" color="primary">
                {{ coinsData[coinsInputOutputValue.inputSelectedCoin].icon }}
              </v-icon>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card>
      <!--  -->
      <v-btn color="white" elevation="5" @click="changeDirection">
        <v-icon icon color="primary">mdi-swap-horizontal-bold</v-icon>
      </v-btn>
      <!--  -->
      <v-card class="ma-5 pa-5" min-width="200px" max-width="600px" elevation="5">
        <v-row>
          <v-col>
            <CoinMenu
              name="outputSelectedCoin"
              :selectedCoin="coinsInputOutputValue.outputSelectedCoin"
            ></CoinMenu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field readonly type="number" :value="outputAmount" label="Количество">
              <v-icon slot="prepend" color="primary">
                {{ coinsData[coinsInputOutputValue.outputSelectedCoin].icon }}
              </v-icon>
            </v-text-field>
          </v-col>
        </v-row>
      </v-card>
    </v-sheet>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CoinMenu from './CoinMenu.vue'
export default {
  components: { CoinMenu },
  data: () => ({
    rules: {
      required: (value) => !!value || 'Необходимо ввести число.',
      negative: (value) => value >= 0 || 'Только положительные числа.',
    },
  }),
  computed: {
    ...mapState({
      coinsData: (state) => state.converter.coinsData,
      coinsInputOutputValue: (state) => state.converter.coinsInputOutputValue,
      coinsPrice: (state) => state.converter.coinsPrice,
    }),
    outputAmount() {
      const inputCoinName = this.coinsData[
        this.coinsInputOutputValue.inputSelectedCoin
      ].name.toLowerCase()
      const outputCoinName = this.coinsData[
        this.coinsInputOutputValue.outputSelectedCoin
      ].id.toLowerCase()

      if (this.coinsInputOutputValue.inputAmount >= 0) {
        return (
          this.coinsInputOutputValue.inputAmount * this.coinsPrice[inputCoinName][outputCoinName]
        )
      } else return 0
    },
  },
  methods: {
    changeDirection() {
      this.$store.commit('reverseDirection')
    },
    changeInputAmount(value) {
      this.$store.dispatch('changeInputAmount', value)
    },
  },
}
</script>
