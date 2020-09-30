import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./api/resouce";

import BaiduMap from 'vue-baidu-map'
// import vuetify from './plugins/vuetify';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


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
  },
  deWeight(arr) {   // 冒泡排序法数组对象去重
    for (var i = 0; i < arr.length - 1; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i].name == arr[j].name) {
                arr.splice(j, 1);
                //因为数组长度减小1，所以直接 j++ 会漏掉一个元素，所以要 j--
                j--;
            }
        }
    }
    return arr;
  },
  get_date() {
    let obj = {}
    obj.Y = new Date().getFullYear();
    obj.M = new Date().getMonth() + 1;
    obj.D = new Date().getDate();
    obj.h = new Date().getHours();
    obj.m = new Date().getMinutes();
    obj.s = new Date().getSeconds();

    let mydate=new Date();
    let myddy=mydate.getDay();//获取存储当前日期
    let weekday=["日","一","二","三","四","五","六"];
    obj.week = weekday[myddy]
    return obj;
  }
}

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
