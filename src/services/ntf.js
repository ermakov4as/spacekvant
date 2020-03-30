import Vue from 'vue'

export default {
  success: msg =>
    Vue.notify({
      group: 'main',
      text: msg
    }),
  warn: msg =>
    Vue.notify({
      group: 'main',
      text: msg,
      type: 'warn'
    }),
  error: msg =>
    Vue.notify({
      group: 'main',
      text: msg,
      type: 'error'
    })
}
