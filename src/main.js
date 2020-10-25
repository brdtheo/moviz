import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

import Vuetify from 'vuetify/lib'
new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#212121',
        secondary: '#b0bec5',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
})

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')