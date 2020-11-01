import Vue from 'vue'
import App from './App.vue'
import router from './router'

// vuetify
import vuetify from './plugins/vuetify';

// firestore
import { firestorePlugin } from 'vuefire'

// i18n
import i18n from "./i18n";

Vue.use(firestorePlugin)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')