import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'

import BootstrapVue from 'bootstrap-vue'
import _ from 'lodash'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Notifications from 'vue-notification'
import VueGlobalVar from 'vue-global-var'
import { Algor, Pole, User, Voln, Poten, DeikAstar, Alert } from '@/models'
Vue.use(VueGlobalVar, {
  globals: {
    algor: Algor,
    pole: Pole,
    user: User,
    voln: Voln,
    poten: Poten,
    deikAstar: DeikAstar,
    alert: Alert,
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
import vuetify from './plugins/vuetify'

Vue.use(BootstrapVue)
Vue.use(Notifications)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
