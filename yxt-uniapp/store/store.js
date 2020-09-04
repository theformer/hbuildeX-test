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
			id:'',
			openId:''//微信openId
		},
		hasLogin: false,
		forcedLogin:false
	},
	mutations: {
		//在用户登录后获取服务器返回数据进行赋值
		login(state, provider) {
			state.hasLogin = true //登录状态为true,表示已经登录
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
			uni.removeStorage({			//清空本地缓存，更改登录状态
				key: 'userInfo'
			});
		}
	}
})

export default store
