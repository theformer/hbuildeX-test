<template>
	<view class="change-password">
		<view class="old-password">
			<text class="password">旧密码</text>
			<input class="ipt" placeholder="请输入旧密码" v-model="oldPassword"/>
		</view>
		<text class="link-top"></text>
		<view class="old-password">
			<text class="password">新密码</text>
			<input class="ipt" placeholder="请输入新密码" password v-model="newPassword" @blur="changPassword"/>
		</view>
		<text class="link-top"></text>
		<view class="old-password">
			<text class="password">确认新密码</text>
			<input class="ipt" placeholder="请输入信密码" password v-model="affirm" @blur="affirmPassword"/>
		</view>
		<text class="link-top"></text>
		<view class="footer">
			<button type="primary" class="btn" @click="saveClick">保存</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				oldPassword:'',
				newPassword:'',
				affirm:'',
				isTrue:true,
				tkMsg:''
			}
		},
		watch:{
			'affirm'(val){
				if(val&&val ==this.newPassword){
					this.isTrue = false
				}
			},
			'newPassword'(val){
				if(val&&val==this.affirm){
					this.isTrue = false
				}
			}
		},
		methods:{
			changPassword(){
				if(!(/^\d{6,15}$/.test(this.newPassword))){
					uni.showToast({
						icon: 'none',
						title:'密码格式6-20位',
					})
				}
			},
			affirmPassword(){
				if(this.affirm !== this.newPassword){
					uni.showToast({
						icon: 'none',
						title:'俩次密码需一致'
					})
					this.isTrue = true
				}
			},
			saveClick(){
				this.tkMsg = this.$store.state.userInfo.tkMsg
				uni.request({
					url: this.baseUrl + '/gxplatform/front/user/editPassword',
					data: {
						 newPassword: this.newPassword,
						 oldPassword:this.oldPassword
					},
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+this.tkMsg
					},
					success: (res) => {
						let list = JSON.parse(JSON.stringify(res.data.data))
						if (res.data.code ==1) { //res.data.data为空时请求数据失败
							uni.showToast({
								icon: 'none',
								title: res.data.message
							})
							uni.clearStorage()
							setTimeout(function(){
								uni.reLaunch({
									url:'../index/index'
								})
							},1000)
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
		}
	}
</script>

<style scoped lang="scss">
	.password{
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(51,51,51,1);
		line-height:46rpx;
		margin-top: 9rpx;
	}
	.btn{
		margin-top: 20%;
		width: 80%;
		background:rgba(29,32,137,1);
		border-radius:45px;
	}
	.ipt{
		margin:3px 0 0 20px;
	}
	.old-password{
		margin: 10px 0 0 10px;
		display: flex;
		flex-direction:row;
		overflow: hidden;
	}
	.link-top {
		display: inline-block;
		width:750rpx;
		height:2rpx;
		border:2rpx solid rgba(245,245,245,1);
	 }
	 .change-password{
		 margin: 10px;
	 }
</style>
