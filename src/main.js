// import 'babel-polyfill'
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


function getServerConfig () {
  return new Promise ((resolve, reject) => {
    axios.get('../serverConfig.json').then((result) => {
      // console.log(result)  // 看打印出来的结果
      let config = result.data;
      for (let key in config) {
        Vue.prototype[key] = config[key];
      }
      // axios.defaults.baseURL = Vue.prototype.baseUrl  // 验证是否已经把属性挂在了Vue上
      resolve();
    }).catch((error) => {
      console.log(error);
      reject()
    })
  })
}
// ES6语法async/await 将异步变成同步
async function init() {
  await getServerConfig();
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}
init()