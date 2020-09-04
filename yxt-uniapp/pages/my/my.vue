<template>
	<view class="my">
		<view class="my-head">
			<view class="user-info-box">
				<view class="portrait-box">
					<image class="portrait" :src="imgUrl||'/static/my/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{fullName||'游客'}}</text>
					<text class="account">{{account||'131*****'}}</text>
					<image src="/static/my/next.png" class="container__head--image" @tap="linkToPersonal"></image>
				</view>
			</view>
		</view>
		<view class="container">
			<view class="container__head" @click="linkToMyCourse" v-if="!flag">
				<image src="/static/my/myCourse.png" class="container__head--img"></image>
				<text class="container__head--feedback">我的课程</text>
				<image src="/static/my/next.png" class="container__menu--img"></image>
			</view>
			<view class="container__head" @click="linkToLearning">
				<image src="/static/my/schedule.png" class="container__head--img"></image>
				<text class="container__head--feedback">学习进度</text>
				<image src="/static/my/next.png" class="container__menu--img"></image>	
			</view>
			<view class="container__head" @click="linkToScoreInquiry" v-if="flag">
				<image src="/static/my/search.png" class="container__head--img"></image>
				<text class="container__head--feedback">成绩查询</text>
				<image src="/static/my/next.png" class="container__menu--img"></image>
			</view>
			<view class="container__head" @click="linkToChange">
				<image class="container__head--img" src="/static/my/changePassword.png"></image>
				<text class="container__head--feedback">修改密码</text>
				<image src="/static/my/next.png" class="container__menu--img"></image>
			</view>
		</view>
		<view class="my-footer">
			<button type="primary" class="btn" @click="loginOut">退出登录</button>
		</view>
	</view>
</template>

<script>

	export default{
		components:{
	
		},
		data(){
			return{
				account:'',
				fullName:'',
				imgUrl:'',
				id:'',
				certificateList:[],
				courseList:[],
				courseId:'',
				flag:false
			}
		},
		onLoad(){
			this.account=this.$store.state.userInfo.account
			this.fullName = this.$store.state.userInfo.fullName
			this.imgUrl = this.$store.state.userInfo.smalImageUrl
			this.id = this.$store.state.userInfo.id

		},
		onShow() {
			this.flag = false
			this.courseList = uni.getStorageSync('courseList')
			let userInfo = uni.getStorageSync('userInfo')
			userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id
				})
			})
			this.courseId = this.courseList[0].value
			
			if(this.courseId==491){
				this.flag= true
			}
		},
		methods:{
			loginOut:function(e){
				uni.request({
					url: this.baseUrl + '/gxplatform/app/user/apploginout',
					data: {
						key:this.id
					},
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+this.tkMsg
					},
					success: (res) => {
						if (res.data.code==1) { //res.data.data为空时请求数据失败
							uni.clearStorage()
							uni.navigateTo({
								url: '../index/index',
								animationType: 'pop-in',
								animationDuration: 300
							})
							return
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					},
				})
			},
			//点击成绩查询进入成绩查询页面
			linkToScoreInquiry(){
				uni.navigateTo({
					url:'./score-inquiry',
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//点击我的课程跳转到我的课程页面
			linkToMyCourse(){
				uni.navigateTo({
					url:'./my-course',
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//点击学习进度跳转到学习进度页面
			linkToLearning(){
				uni.navigateTo({
					url:'./learning-progress?courseId='+this.courseId,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//点击个人资料跳转到个人资料页面
			linkToPersonal(){
				uni.navigateTo({
					url:'./personal-data?courseId='+this.courseId,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//点击修改密码跳转到修改密码页面
			linkToChange(){
				uni.navigateTo({
					url:'./change-password',
					animationType: 'pop-in',
					animationDuration: 300
				})
			}
		}
	}
</script>

<style scoped lang='scss'>
	.account{
		font-size:24rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(200,200,200,1);
		display: block;
		margin-top: 20rpx;
		margin-left: 40rpx;
	}
	.my-head{
		height: 240rpx;
	}
	.user-info-box{
		/* height: 180px; */
		margin: 31rpx 0 0 31rpx;
		display:flex;
		align-items:center;
		position:relative;
		z-index: 1;
		.portrait{
			width: 125rpx;
			height: 122rpx;
			border:5px solid #fff;
			border-radius: 50%;
		}
		.username{
		margin-left: 40rpx;
		font-size:36rpx;
		font-family:Source Han Sans CN;
		font-weight:500;
		color:rgba(53,53,55,1);
		}
	}
	.btn{
		width: 80%;
		margin-bottom: 20%;
		border-radius: 25px;
		background-color: #1D2089;
	}
	.my-footer{
		margin-top: 75%;
	}
	.link-top {
		display: inline-block;
	    width: 120%;
		margin-left: -20px;
	    height: 1px;
	    border-top: solid #a5a5a5 1px;
	 }
	 .container__head--feedback{
		 color: #222222;
		 font-size: 26rpx;
		 margin-left: 50rpx;
	 }
	.container__menu--img{
		position: absolute;
		width: 32px;
		height: 32px;
		top: -6px;
		right: 0px;
	}
	.container__head--img{
		position: absolute;
		width: 26rpx;
		height: 31rpx;
		top: 2px;

	}
	.container__head--image{
		position: absolute;
		width: 48rpx;
		height: 48rpx;
		top: 40%;
		right: 0px;
	}
	.container__menu{
		margin:15px 10px 30px 10px;
		color: #a5a5a5;
		position: relative;
		font-size: 14px;
	}
	.container__head{
		margin:15px 10px 30px 10px;
		color: #a5a5a5;
		position: relative;
		font-size: 14px;
		display: flex;
		flex-direction: row;
	}
	.container{
		font-size:26rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(34,34,34,1);
		margin-left: 31rpx;
	}
</style>
