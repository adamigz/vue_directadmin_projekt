import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/axios'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

Vue.config.productionTip = false;
Vue.use(require('vue-cookies'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
