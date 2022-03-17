import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import plugins from './plugins'

import '@/assets/css/bootstrap.min.css';
import '@/assets/css/materialdesignicons.min.css';

Vue.config.productionTip = false
Vue.use(plugins);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
