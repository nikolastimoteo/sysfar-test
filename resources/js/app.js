require("./bootstrap");
import Vue from "vue";
import VueAxios from "vue-axios";
import moment from "moment";
import VueTheMask from "vue-the-mask";
import App from "./components/App.vue";
import { router } from "./router";
import { store } from "./store";
import { ValidationObserver, ValidationProvider, extend, localize } from "vee-validate";
import { required, email, regex, min } from "vee-validate/dist/rules";
import LaraveVuePagination from "laravel-vue-pagination";
import VuePageTransition from "vue-page-transition";
import Notifications from "vue-notification";
import velocity from "velocity-animate";

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
      if (router.currentRoute.name !== "login") {
        Vue.notify({
          group: "auth",
          type: "warn",
          title: "Sessão Expirada!",
          text: "Faça login novamente para continuar.",
          duration: 5000,
          speed: 1000
        });
        router.push({ name: "login" });
      }
  }
  return Promise.reject(error);
});

// Vee-Validate
localize("pt_BR");
localize({
  pt_BR: {
    messages: {
      required: "Campo obrigatório.",
      email: "E-mail inválido.",
      date_format: "Data inválida. Formato aceito: dd/mm/aaaa",
      min: "Mínimo {length} caracteres."
    },
    fields: {
      phone: {
        regex: "Telefone inválido. Formatos aceitos: +99 (99) 99999-9999 ou +99 (99) 9999-9999"
      }
    }
  }
});
extend("required", required);
extend("email", email);
extend("regex", regex);
extend("min", min);
extend("date_format", value => {
  return moment(value, 'DD/MM/YYYY', true).isValid();
});

// Global Components
Vue.component("Pagination", LaraveVuePagination);
Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

// Filters
Vue.filter("birthDateAndAge", function (date) {
  return moment(date).format("DD/MM/YYYY") +" ("+ moment().diff(date, "years") +" anos)";
});
Vue.filter("birthDate", function (date) {
  return moment(date).format("DD/MM/YYYY");
});

// VueTheMask
Vue.use(VueTheMask);

// VuePageTransition
Vue.use(VuePageTransition);

// VueNotifications
Vue.use(Notifications, { velocity });

// Production config
if (process.env.NODE_ENV === "production") {
  Vue.config.devtools = false;
  Vue.config.debug = false;
  Vue.config.silent = true;
}

new Vue({
  el: "#app",
  router: router,
  store: store,
  render: (app) => app(App),
});
