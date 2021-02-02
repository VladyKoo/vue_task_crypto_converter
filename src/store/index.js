import Vue from 'vue'
import Vuex from 'vuex'
import converter from './module/converter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    converter,
  },
})
