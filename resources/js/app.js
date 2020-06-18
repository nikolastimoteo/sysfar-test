require('./bootstrap');
import Vue from 'vue';
import VueAxios from 'vue-axios';
import App from './components/App.vue';
import router from './router';

// Axios Config
const axiosInstance = axios.create({
    baseURL: '/api/v1',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});
Vue.use(VueAxios, axiosInstance);

// Axios Interceptors
Vue.axios.interceptors.request.use(function (config) {
    const token = localStorage.getItem('user-token');
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

new Vue({
    el: '#app',
    router: router,
    render: app => app(App)
});