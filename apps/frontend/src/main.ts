import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { auth0 } from "./auth/auth0";
import router from "./router";

createApp(App).use(auth0).use(router).mount("#app");
