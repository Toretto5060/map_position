import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./api/resouce";

import BaiduMap from 'vue-baidu-map'
import vuetify from './plugins/vuetify';

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '85XfbtCjIyfhu5CSP3vLr9u5eQgujuyc'
})

import './mock/mock'

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

Vue.prototype.fuc = {
  crdFormation(psi) {
    let arr = psi.split(',')
    let obj = {}
    if (arr.length > 1) {
      obj = {
        lng:arr[0],
        lat:arr[1]
      }
    } else {
      obj = {
        lng:0,
        lat:0
      }
    }
    return obj
  }
}

new Vue({
  router,
  store,
  axios,
  vuetify,
  render: h => h(App)
}).$mount("#app");
