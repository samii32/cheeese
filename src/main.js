import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import BootstrapVue from 'bootstrap-vue'
import VueSession from 'vue-session'

import io from 'socket.io-client'
const socket = io('http://localhost:3001', {
  withCredentials: true,
  extraHeaders: {
    'my-custom-header': 'abcd'
  }
})

Vue.prototype.$socket = socket

Vue.config.productionTip = false
var sessionOptions = {
  persist: true
}
Vue.use(VueSession, sessionOptions, io)

new Vue({
  router,
  store,
  vuetify,
  BootstrapVue,
  render: h => h(App)
}).$mount('#app')
