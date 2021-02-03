<template>
  <div>
    <v-sheet class="d-flex justify-center align-center" height="100%">
      <v-card class="ma-5 pa-5" min-width="200px" max-width="600px" elevation="5">
        <v-row>
          <v-col>
            <CoinMenu name="inputSelected"></CoinMenu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              type="number"
              :value="userValue.inputAmount"
              @input="changeInputAmount($event)"
              :rules="[rules.required, rules.negative]"
              label="Количество"
              min="0"
              clearable
            >
              <v-icon slot="prepend" color="primary">
                {{ coinsData[userValue.inputSelected.num].icon }}
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
            <CoinMenu name="outputSelected"></CoinMenu>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field readonly type="number" :value="outputAmount" label="Количество">
              <v-icon slot="prepend" color="primary">
                {{ coinsData[userValue.outputSelected.num].icon }}
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
import CoinMenu from '../converter/CoinMenu'
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
      coinsPrice: (state) => state.converter.coinsPrice,
      userValue: (state) => state.converter.userValue,
    }),
    outputAmount() {
      if (this.userValue.inputAmount > 0) {
        return (
          this.userValue.inputAmount *
          this.coinsPrice[this.userValue.inputSelected.symbol][this.userValue.outputSelected.id]
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
