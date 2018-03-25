// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import BootstrapVue from 'bootstrap-vue'
import firebase from 'firebase'

Vue.use(VueResource);
Vue.use(BootstrapVue);

Vue.config.productionTip = false
var config = {
  apiKey: "AIzaSyD7Rq0IZIdlD__FTqSRnZDcW9N1ejH4IWY",
  authDomain: "ethuoft-2ccd7.firebaseapp.com",
  databaseURL: "https://ethuoft-2ccd7.firebaseio.com",
  projectId: "ethuoft-2ccd7",
  storageBucket: "",
  messagingSenderId: "106215407805"
};

firebase.initializeApp(config);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
