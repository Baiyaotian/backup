
import Vue from 'vue'

import $ from 'jquery'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import '@/assets/fonts/icon-font2/iconfont.css'
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
import axios from 'axios'
import md5 from 'js-md5';
import vueResource from 'vue-resource'

Vue.use(vueResource)

const {
  Message
} = Element;
Vue.prototype.$Message = Message;

window.$ = $;
Vue.use(ElementUI, {
  size: 'small'
});
// Vue.prototype.$api = axios
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')