<template>
	<view class="container">
		<view id="z-index">
			<view class="container-login"><image src="../../static/login/自考学堂a.png" class="login-photo"></image></view>
			<view class="" style="margin-left: 33rpx;">
				<view class="container-phone">
					<image src="../../static/login/icon-phone.png" class="login-phone"></image>
					<input class="login-input" v-model="account" placeholder="请输入手机号" @blur="onAccoutBlur" />
				</view>
				<text class="link-top"></text>
				<view class="container-phone">
					<image src="../../static/login/icon-code.png" class="login-code"></image>
					<input class="login-password" @blur="onPasswordBlur" v-model="password" password placeholder="请输入密码" />
				</view>
				<text class="link-top"></text>
			</view>
			<view><button type="primary" class="btn" @click="loginClick">登录</button></view>
			<view class="footer"><u-divider color="#999999">第三方登录</u-divider></view>
			<view class="footer-wx">
				
				<button type="default"  open-type="getPhoneNumber"  style="width: 84rpx;height: 84rpx;border-radius: 50%;" lang="zh_CN" withCredentials="true"  @getphonenumber="appLoginWx">
					<image src="../../static/login/微信.png" style="width: 84rpx;height: 84rpx;margin-left: -28rpx;"></image>
				</button>
				
			</view>
		</view>
<!-- 		<uniPopup class="wx-login" type="bottom" ref="popup">
			<view class="footer-view">
				<text class="tip">你的手机号码</text>
				<text class="link-bottom"></text>
				<view>
					<text class="phone">{{ ossss }}</text>
					<text class="wx-phone">微信绑定号码</text>
				</view>
				<text class="link-bottom"></text>
				<view class="other-phone">使用其他手机号</view>
				<view class="btn-style">
					<button @click="cancalClick" class="cancal" type="primary" size="mini">取消</button>
					<button size="mini" type="primary" class="ok-button">允许</button>
				</view>
			</view>
		</uniPopup> -->
	</view>
</template>

<script>
// import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue'
import {
		mapState,
        mapMutations
    } from 'vuex';
export default {
	// components:{uniPopup},
	data() {
		return {
			account:'',
			password:''
		}
	},
	onLoad() {
		// this.checkGuide();
	},
	computed:{
		...mapState(['hasLogin','forcedLogin']),
	},
	methods: {
		...mapMutations(['login']),  //对全局方法login进行监控
		getphonenumber:function(e){
			console.log(e,'我是调取手机号的api')
		},
		 appLoginWx(e){
			 //改变this指向
			 console.log(e,'我是返回过来值')
			 
			 let ret = e.detail
			 let encryptedData = ret.encryptedData
			 let iv = ret.iv
			 if(ret.errMsg=='getPhoneNumber:fail user deny'){
				 uni.showToast({
				 	icon: 'none',
				 	title: '为了更好的服务，请同意授权'
				 });
			 }else if(ret.errMsg=='getPhoneNumber:ok'){
				  let _self = this
				  // #ifdef MP-WEIXIN
				  uni.getProvider({
					  service:'oauth',
					  success:function(res){
						  console.log(res,'我是返回的的数据库分公司可值')
						  if(~res.provider.indexOf('weixin')){
							  
						//获取code
							uni.login({
								provider: 'weixin',
								success: (res) => {
									console.log(res,'萨迪克几哈UIoh大搜i')
									_self.authorization = res.code;
									
									//获取账号信息
									// uni.getUserInfo({
									// 	provider: 'weixin',
									// 	withCredentials:true,
									// 	lang:'zh_CN',
									// 	success: (info) => {//这里请求接口
										// console.log(info,'我是info文档')
										// let encryptedData = info.encryptedData
										// let iv = info.iv
										uni.request({
											url: _self.baseUrl + '/gxplatform/wechat/user/getPhoneNumberNoLogin',
											data: {
												encryptedData:encryptedData,
												iv:iv,
												code:_self.authorization
											},
											method: "POST",
											header: {
												'content-type': 'application/x-www-form-urlencoded'
											},
											success: (res) => {
												if (res.data.code ==1) { //res.data.data为空时请求数据失败
													console.log(res,'我是调用成功')
													// uni.showToast({
													// 	icon: 'success',
													// 	title:res.data.message,
													// })
													// this.login(res.data.data)
													// uni.reLaunch({
													// 	url:'../course/course'
													// })
												} else {
														uni.showToast({
															icon: 'none',
															title: res.data.message
														});
														return
												}
										
											},
									// 	})
									// },
										fail: () => {
											uni.showToast({title:"微信登录授22222权失败",icon:"none"});
										}
									})
							
								},
								fail: () => {
									uni.showToast({title:"微信登录333333授权失败",icon:"none"});
								}
							})
				  //#endif
				  }
				},
			})
				  
			}else{
				 uni.showToast({
				 	icon: 'none',
				 	title: '授权失败'
				 });
			 }
			
		 
		},
		loginClick() {
			if (!this.account && !this.password) {
				uni.showToast({
					title: '请输入手机号和密码',
					duration: 2000
				});
				return
			} else if (this.account && !this.password) {
				uni.showToast({
					title: '请输入密码',
					duration: 2000,
				});
				return
			} else if (!this.account && this.password) {
				uni.showToast({
					title: '请输入手机号',
					duration: 2000
				});
				return
			} else {
				uni.request({
					url: this.baseUrl + '/gxplatform/app/user/applogin',
					data: {
						account: this.account,
						password: this.password
					},
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded'
					},
					success: (res) => {
						// let list = JSON.parse(JSON.stringify(res.data.data))
						if (res.data.code ==1) { //res.data.data为空时请求数据失败
							uni.showToast({
								icon: 'success',
								title:res.data.message,
							})
							this.login(res.data.data)
							uni.reLaunch({
								url:'../course/course'
							})
						} else {
								uni.showToast({
									icon: 'none',
									title: res.data.message
								});
								return
						}

					},
				})
			}
		},
		onAccoutBlur(){
			if(!(this.$valid.mobile.test(this.account))){
				uni.showToast({
					icon: 'none',
					title:'请输入正确的手机号',
				})
			}
		},
		onPasswordBlur(){
			if(!(/^\d{6,15}$/.test(this.password))){
				uni.showToast({
					icon: 'none',
					title:'密码格式6-20位',
				})
			}
		},
		// openWx(){
		// 	this.$refs.popup.open()
		// },
		// cancalClick(){
		// 	this.$refs.popup.close()
		// }
	}
}
</script>

<style scoped lang="scss">
.ok-button {
	width: 217rpx;
	height: 72rpx;
	background: rgba(16, 194, 97, 1);
	border-radius: 10rpx;
}
.other-phone {
	margin: 20rpx 43rpx 93rpx 34rpx;
	width: 185rpx;
	height: 25rpx;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: bold;
	color: rgba(29, 32, 137, 1);
	line-height: 40rpx;
}
.wx-phone {
	margin: 20rpx 43rpx 20rpx 34rpx;
	width: 159rpx;
	height: 25rpx;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: bold;
	color: rgba(153, 153, 153, 1);
	line-height: 40rpx;
}
.phone {
	margin: 20rpx 43rpx 20rpx 34rpx;
	width: 163rpx;
	height: 20rpx;
	font-size: 26rpx;
	font-family: Source Han Sans CN;
	font-weight: bold;
	color: rgba(34, 34, 34, 1);
	line-height: 40rpx;
}
.footer-view {
	background-color: #ffffff;
	height: 595rpx;
}
.btn-style {
	display: flex;
	flex-direction: row;
}
.cancal {
	width: 217rpx;
	height: 72rpx;
	background: rgba(237, 237, 237, 1);
	border-radius: 10rpx;
	color: #10c261;
}
.tip {
	display: inline-block;
	margin: 78rpx 0 0 34rpx;
	width: 195rpx;
	height: 31rpx;
	font-size: 32rpx;
	font-family: Source Han Sans CN;
	font-weight: bold;
	color: rgba(17, 17, 17, 1);
	line-height: 40px;
}
.wx-login {
	// background-color: #FFFFFF;
	width: 750rpx;
	height: 595rpx;
	// display: inline-block;
}
.footer-wx {
	text-align: center;
	margin-top: 48rpx;
}
.footer {
	margin-top: 105rpx;
}
.link-bottom {
	display: inline-block;
	margin: 10rpx 75rpx 10rpx 71rpx;
	border-top: solid #f1f1f1 1px;
	width: 679rpx;
	height: 2rpx;
}
.link-top {
	display: inline-block;
	margin: 10rpx 75rpx 10rpx 34rpx;
	width: 521rpx;
	height: 2px;
	border-top: solid #a5a5a5 1px;
}
.container-login {
	text-align: center;
	margin-top: 97rpx;
	margin-bottom: 97rpx;
}
.login-input {
	margin-left: 71rpx;
}
.login-password {
	margin-left: 71rpx;
}
.container-phone {
	display: flex;
	flex-direction: row;
}
.login-code {
	width: 31rpx;
	height: 35rpx;
	margin-top: 7rpx;
}
.login-phone {
	width: 27rpx;
	height: 42rpx;
	margin-top: 4rpx;
}
.login-photo {
	width: 134rpx;
	height: 134rpx;
	margin-top: 2rpx;
}
.btn {
	margin-top: 82rpx;
	width: 477rpx;
	background-color: #1e1f8b;
	border-radius: 50rpx;
	color: #ffffff;
}
.container {
	padding: 20px;
	font-size: 14px;
	line-height: 24px;
}
</style>
