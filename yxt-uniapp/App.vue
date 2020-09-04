<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import {  
			// mapState,
	        mapMutations  
	    } from 'vuex';  
	export default {
		components:{
			// ...mapState(['hasLogin,userInfo'])
		},
		 onLoad(){
			// if(!this.hasLogin){
			// 	uni.showModal({
			// 		title:'未登录',
			// 		content:'您未登录，需要登录后才能继续',
			// 		success: (res) => {
			// 			if(res.confirm){
			// 				/* 
			// 				 强制登录
			// 				 */
			// 				if(!this.accout){
			// 					uni.navigateTo({
			// 						url:'pages/index/index'
			// 					})
			// 				}else{
			// 					uni.navigateTo({
			// 						url:'pages/index/index'
			// 					})
			// 				}
			// 			}
			// 		}
			// 	})
			// }
		 },
		onLaunch: function() {
			let userInfo = uni.getStorageInfoSync('userInfo')
			if(userInfo.accout){
				this.login(res.data)
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {  
		            ...mapMutations(['login'])  
		        }  
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* #ifdef MP-WEIXIN */
	checkbox .wx-checkbox-input{
		border-radius: 50%;
		// height: 46px;
		// width: 46rpx;
	}
	checkbox .wx-checkbox-input.wx-checkbox-input-checked{
		border-color:#1d2088 !important;
		background:#1d2088 !important;
	}
	checkbox .wx-checkbox-input.wx-checkbox-input-checked::before{
		border-radius:50%;
		// height: 28rpx;
		// width: 28rpx;
		// text-align:center;
		color:#fff;
		background:#1d2088;
		transform:translate(-50%, -50%) scale(1);
	}
	radio .wx-radio-input.wx-radio-input-checked{
		border-color:#1d2088 !important;
		background:#1d2088 !important;
	}
	radio .wx-radio-input{
		border-radius: 50%;
		// height: 46px;
		// width: 46rpx;
	}
	radio .wx-radio-input.wx-radio-input-checked::before{
		color:#fff;
		background:#1d2088;
		transform:translate(-50%, -50%) scale(1);
	}
	/* #endif */
</style>
