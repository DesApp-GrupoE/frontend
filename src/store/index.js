import Vue from 'vue'
import Vuex from 'vuex'

import language from './language';
import commerceSector from './commerce_sector';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    language,
    commerceSector
  }
})
