import Vue from "vue";
import Main from "./main.vue";
import vuetify from "./vuetify";

// main vue の初期化
new Vue({
    vuetify,
    render: h => h(Main),
}).$mount("#app");
