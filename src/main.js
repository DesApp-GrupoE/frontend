import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
import store from './store'
import i18n from './i18n/i18n.js'

import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart, faTimesCircle, faGlobeAmericas, faHome,
  faUserCircle, faEye, faBars, faStore, faShoppingBasket, faClock, faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import '@/assets/css/fonts.css';
import '@/assets/css/core.css';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';

// Install BootstrapVue
Vue.use(BootstrapVue)
// Install Font-Awesome
library.add(faShoppingCart, faTimesCircle, faGlobeAmericas, faUserCircle, 
  faEye, faBars, faStore, faShoppingBasket, faClock, faHome, faGoogle, faCalendarAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(require('vue-moment'));
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);

Vue.config.productionTip = false

new Vue({
  router,
  i18n,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('commerceSector/getCommerceSectors')
  }
}).$mount('#app')

Vue.directive('number-pos-only', {
  bind(el) {
    el.addEventListener('keyup', () => {
      let regex = /^[0-9]*$/
      if (!regex.test(el.value)) {
        el.value = el.value.slice(0, -1)
      }
    })
  }
})

axios.interceptors.response.use((response) => {
  // do something with the response data
  console.log('Response was received');

  return response;
}, error => {
  console.log('Response error was received');
  console.log(error);
  // handle the response error
  return Promise.reject(error);
});