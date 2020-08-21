<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
</style>
<script>
	import {  
			mapState,
	        mapMutations  
	    } from 'vuex';  
	export default {
		components:mapState(['hasLogin','forcedLogin']),
		// uni.setStorage({
		// key: 'sessionId',
		// data: 'JSESSIONID='+res.data.sessionId,
		// success: function (res) {
		// console.log(res)
		// }
		// })
		 onLoad(){
			if(!this.hasLogin){
				uni.showModal({
					title:'未登录',
					content:'您未登录，需要登录后才能继续',
					success: (res) => {
						if(res.confirm){
							/* 
							 强制登录
							 */
							if(this.forcedLogin){
								uni.reLaunch({
									url:'pages/index/index'
								})
							}else{
								uni.navigateTo({
									url:'pages/index/index'
								})
							}
						}
					}
				})
			}
		 },
		onLaunch: function() {
			let userInfo = uni.getStorageInfoSync('userInfo')
			if(userInfo.accout){
				uni.getStorage({
					key:'userInfo',
					success:(res)=>{
						this.login(res.data)
					}
				})
			}
			// uni.getStorage({//获得保存在本地的用户信息  	
			 //                key: 'uerInfo',  
			 //                success:(res) => {  
			 //                    this.login(res.data.data);  
			 //                    uni.request({// 再次校验并刷新token的有效时间  
			 //                        url:this.baseUrl + '/gxplatform/app/user/applogin',  
			 //                        header: {  
			 //                            "Content-Type": "application/x-www-form-urlencoded",  
			 //                            "Token":res.data.tkMsg  
			 //                        },  
			 //                        data: {  
			 //                            // "username":res.data.fullName  
			 //                        },  
			 //                        method: "POST",  
			 //                        success: (e) => {  
			 //                            if (e.statusCode === 200 && e.data.code === 1) {  
			 //                                this.login(e.data);
			 //                            }  
			 //                        }  
			 //                    })  
			 //                }  
			 //            })  
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

<style>
	/*每个页面公共css */
	.checkbox .uni-checkbox-wrapper{
	width:30upx;
	height:30upx;
	}
	.checkbox .uni-checkbox-input.uni-checkbox-input-checked{
	border-color:#FFD940 !important;
	background:#FFD940 !important;
	}
	.checkbox .uni-checkbox-input.uni-checkbox-input-checked::before{
	border-radius:50%;
	width:30upx;
	height:30upx;
	line-height:30upx;
	text-align:center;
	font-size:26upx;
	color:#000;
	background:transparent;
	transform:translate(-50%, -50%) scale(1);
	}
</style>
