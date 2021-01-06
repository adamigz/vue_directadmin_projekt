import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false;
//axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
