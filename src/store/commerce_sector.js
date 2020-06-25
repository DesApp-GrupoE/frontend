import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import CommerceService from '@/service/user/CommerceService.js';

Vue.use(VueLocalStorage);

export default {
  namespaced: true,
  state: {
    sectors: []
  },
  mutations: {
    SET_SECTORS: (state, sectors) => state.sectors = sectors,
  },
  actions: {
    getCommerceSectors({commit}) {
      CommerceService.getSectors()
        .then(response => {
          commit('SET_SECTORS', response.data.sort());
        })
    }
  }
};