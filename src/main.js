import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import qs from 'qs';
import * as echarts from 'echarts';




Vue.prototype.echarts = echarts;
Vue.prototype.qs=qs;
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;
Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
