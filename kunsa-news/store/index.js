// vuex 状态管理器

// 引入 vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 插入到vue
Vue.use(Vuex)

// Vuex.Store() => 实例的根 state 对象。
const store = new Vuex.Store({
	// state: 数据源
	state: {
		// uni.getStorageSync() 本地缓存
		historyLists: uni.getStorageSync("__history") || []
	},
	
	// mutations: 可以改变state数据
	mutations: {
		// 修改 historyList 的方法
		SET_HISTORY_LIST(state, history) {
			// state => 数据源
			// histor => actions传进的数据
			
			state.historyLists = history
		},
		
		// 清空 historyList值的方法
		CLEAR_HISTORY(state) {
			state.historyLists = []
		}
	},
	
	// actions: actions是异步操作, 提交mutations内的方法
	actions: {
		// 执行 SET_HISTORY_LIST()
		set_history({commit, state}, history) {
			// commit => 调用mutations内的方法
			// state => 数据源
			// history => 客户端传入过来的值
			
			let list = state.historyLists
			list.unshift(history)
			
			uni.setStorageSync('__history', list)
			
			commit('SET_HISTORY_LIST', list)
		},
		
		// 执行 CLEAR_HISTORY()
		clearHistory({commit}) {
			uni.removeStorageSync('__history')
			
			commit('CLEAR_HISTORY')
		}
	}
})

export default store