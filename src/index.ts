import Vue from "vue";
import Main from "./main.vue";

// main vue の初期化
new Vue({
    el: "#app",
    render: h => h(Main)
});
