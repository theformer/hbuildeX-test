import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {
			tkMsg:'',
			fullName:'',
			courseId:'',
			account:'',
			smalImageUrl:'',
			id:''
		},
		hasLogin: false,
		forcedLogin:false
	},
	mutations: {
		login(state, provider) {
			state.hasLogin = true
			state.userInfo.tkMsg = provider.tkMsg
			state.userInfo.fullName = provider.fullName
			state.userInfo.courseId = provider.defaultCourseId
			state.userInfo.account = provider.account
			state.userInfo.smalImageUrl = provider.smalImageUrl
			state.userInfo.id=provider.id
			uni.setStorage({
				key: 'userInfo',
				data: provider
			})
		},
		logout(state) {
			state.hasLogin = false
			state.userInfo = {}
			uni.removeStorage({
				key: 'userInfo'
			});
		}
	}
})

export default store
