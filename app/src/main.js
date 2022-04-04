import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Fragment from "vue-fragment";
import axios from "axios";
import VueAxios from "vue-axios";

Vue.use(Fragment.Plugin);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

let app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

global.vm = app;
