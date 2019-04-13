import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// import axios from "axios";

Vue.config.productionTip = false;
// Vue.prototype.$http=axios;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

// 过滤器@q
import * as filters from './assets/time.js';
// 过滤器@q
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})