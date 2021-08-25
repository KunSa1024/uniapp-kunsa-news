import Vue from 'vue'
import App from './App'

import api from './common/api/index.js'
// 存储到 vue 原型里面
Vue.prototype.$api = api

// 引入vuex文件
import store from './store'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	// 注册
	store,
    ...App
})
app.$mount()
