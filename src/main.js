import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap";
import "./assets/main.scss";
import "jquery";
import "popper.js";
Vue.config.productionTip = false;
//global directive
Vue.directive("highlight", {
  // eslint-disable-next-line no-unused-vars
  bind(el, binding, vnode) {
    //el.style.backgroundColor = "#dddddd";
    //el.style.backgroundColor = binding.value;
    var delay = 0;
    if (binding.modifiers["delayed"]) {
      delay = 2000;
    }
    setTimeout(() => {
      if (binding.arg == "background") {
        el.style.backgroundColor = binding.value;
      } else {
        el.style.color = binding.value;
      }
    }, delay);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
