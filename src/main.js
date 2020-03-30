import Vue from 'vue'
import App from '@/App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from '@/router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { Connect, LED, Motors } from '@/models'

import Notifications from 'vue-notification'
import VueGlobalVar from 'vue-global-var'
import vuetify from '@/plugins/vuetify'

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueGlobalVar, {
  globals: {
    connect: Connect,
    led: LED,
    motors: Motors,
    $ntf: {
      success: msg => {
        Vue.notify({
          group: 'main',
          text: msg
        })
      },
      error: msg => {
        Vue.notify({
          group: 'main',
          text: msg,
          type: 'error'
        })
      }
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
