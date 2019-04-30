import Vue from 'vue'
import App from './App'
import store from './state/index.js'

// import axios from 'axios'
// 
// Vue.prototype.$http = axios;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'


Vue.config.productionTip = false
// import store from './store'  
// Vue.prototype.$store = store  

App.mpType = 'app'

Vue.prototype.$store = store

const app = new Vue({
    ...App,
	store
})
app.$mount()
