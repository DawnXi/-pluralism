import Vue from 'vue'
import App from './App'
import store from './state/index.js'

// #ifdef H5
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://127.0.0.1:3000/');
// #endif



Vue.config.productionTip = false

App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue({
    ...App,
	store
})
app.$mount()
