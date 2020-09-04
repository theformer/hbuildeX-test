import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
Vue.use(uView)
import store from '@/store/store'

import courses  from './common/common.js'

import VALID from './lib/validation';

Vue.prototype.baseUrl = 'http://test2.360xkw.com:8082'

Vue.prototype.$store =store
Vue.config.productionTip = false
Vue.prototype.$valid = VALID;
Vue.prototype.$courses = courses

App.mpType = 'app'


const app = new Vue({
	store,
    ...App
})
app.$mount()
