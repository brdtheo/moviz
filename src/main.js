import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { auth } from "./firebase";
import { db } from "./firebase"

// vuetify
import vuetify from './plugins/vuetify';

// vuefire
import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)

// i18n
import i18n from "./i18n";


Vue.config.productionTip = false

Vue.mixin({
  data: function () {
    return {
      user: null
    }
  },

  created() {
    var vm = this.$data;

    auth.onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        db.collection("users")
          .doc(user.uid)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              vm.user = doc.data();
              vm.user.id = doc.id;
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          });
      } else {
        vm.user = null;
      }
    });
  }
})

new Vue({
  router,
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')