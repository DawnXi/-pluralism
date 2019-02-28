import Vue from 'vue'
import App from './App'
import store from './state/index.js'

// import axios from 'axios'
// 
// Vue.prototype.$http = axios;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store: store,
})
app.$mount()
