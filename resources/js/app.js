require("./bootstrap");
import Vue from "vue";
import VueAxios from "vue-axios";
import App from "./components/App.vue";
import { router } from "./router";
import { store } from "./store";
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import { required, email } from "vee-validate/dist/rules";

// Axios Config
const axiosInstance = axios.create({
  baseURL: "/api/v1",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
Vue.use(VueAxios, axiosInstance);

// Axios Interceptors
Vue.axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("user-token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
Vue.axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  const err = error.response;
  if(!err.data.status && err.status === 401 && err.config && !err.config.__isRetryRequest) {
      localStorage.removeItem("user-token");
      router.push({name: "login"});
  }
  return Promise.reject(error);
});

// Vee-Validate
localize("pt_BR");
localize({
  pt_BR: {
    messages: {
      required: "Campo obrigatório.",
      email: "E-mail inválido."
    },
    // fields: {
    //   password: {
    //     required: "teste"
    //   }
    // }
  }
});
extend("required", required);
extend("email", email);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

new Vue({
  el: "#app",
  router: router,
  store: store,
  render: (app) => app(App),
});
