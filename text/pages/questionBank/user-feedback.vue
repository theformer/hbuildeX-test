<template>
	<view class="user-feedback">
		<view class="container">
			<textarea class="container-head" :value="value" :maxlength="-1" :placeholder="text" @input="blurText"/>
		</view>
		<view class="foot">
			<button type="default" class="btn" size="mini" @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				text:'感谢您提出的宝贵问题，我们会尽快优化产品，提升用户体验。',
				tkMsg:'',
				val:'',
				itemId:'',
				type:''	
			}
		},
		methods:{
			blurText:function(e){
				this.val = e.detail.value
			},
			submit:function(e){
				this.tkMsg = this.$store.state.userInfo.tkMsg
				uni.request({
					url: this.baseUrl + '/gxplatform/front/feedBack/addGxFeedBack',
					data: {
						itemId:this.itemId,
						type:this.type,
						content:this.val
					},
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+this.tkMsg
					},
					success: (res) => {
						if (res.data.code ==1) { //res.data.data为空时请求数据失败
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
							setTimeout(function(){
								uni.navigateBack({
								delta:1,
								animationType: 'pop-in',
								animationDuration: 200})
							},2000)
						}
					},
				})
			}
		},
		onShow() {
			
		},
		onLoad(option){
			this.type= option.type
			this.itemId = option.itemId
		}
	}
</script>

<style scoped lang="scss">
	.user-feedback{
		margin: 40rpx 25rpx;
		.container{
			.container-head{
				width: 690rpx;
				height: 390rpx;
				border: thin dotted #333333;
				line-height:45rpx;
				padding: 25rpx 0 0 10rpx;
			}
			
		}
		.foot{
			text-align: center;
			.btn{
				width: 452rpx;
				height: 91rpx;
				margin: 95rpx auto;
				background-color: #1d2088;
				color: #FFFFFF;
				border-radius: 50rpx;
				font-size: 34rpx;
				line-height: 91rpx
			}
		}
	}
	
</style>
