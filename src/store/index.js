import Vue from 'vue'
import Vuex from 'vuex'
import converter from './module/converter'
import portfolio from './module/portfolio'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    converter,
    portfolio,
  },
})
