<template>
	<view class="personal-data">
		<view class="header">
			<text class="explain"></text>
			<text class="personal-information">个人信息</text>
		</view>
		<image style="margin-top: 30rpx;width: 749rpx;height: 2rpx;" src="/static/my/rectangleLine.png"></image>
		<view class="header-container">
			<view class="header-container-message">
				<text class="head-portrait">头像</text>
				<image :src="imgUrl||'/static/my/missing-face.png'" class="login-png"></image>
			</view>
			<text class="line"></text>
			<view class="header-container-message">
				<text class="head-portrait">手机账号</text>
				<text class="explanatory-note">{{search.phone}}</text>
			</view>
				<text class="line"></text>
			<view  class="header-container-message">
				<text class="head-portrait">出生年月</text>
				<text class="explanatory-note">{{search.birthday}}</text>
			</view>
				<text class="line"></text>
			<view  class="header-container-message">
				<text class="head-portrait">政治面貌</text>
				<text class="explanatory-note">{{search.politicalOutlook}}</text>
			</view>
				<text class="line"></text>
			<view  class="header-container-message">
				<text class="head-portrait">籍贯</text>
				<text class="explanatory-note">{{search.idCardAddress}}</text>
			</view>
		</view>
		<image style="margin-top: 30rpx;width: 749rpx;height: 2rpx;" src="/static/my/rectangleLine.png"></image>
		<view class="footer">
			<text class="explain"></text>
			<text class="personal-information">院校信息</text>
		</view>
		<view class="footer-container">
			<view  class="header-container-message">
				<text class="head-portrait">院校</text>
				<text class="explanatory-note">{{search.collegeName}}</text>
			</view  class="header-container-message">
			<view  class="header-container-message" v-if="flag">
					<text class="head-portrait">学籍</text>
					<text class="explanatory-note">{{search.studentStatus}}</text>
			</view  class="header-container-message">
			<text class="line"></text>
			<view class="header-container-message" v-if="!flag">
				<text class="head-portrait">批次</text>
				<text class="explanatory-note">{{search.periodName}}</text>
			</view  class="header-container-message" v-if="!flag">
				<text class="line" v-if="!flag"></text>
			<view  class="header-container-message" v-if="!flag">
				<text class="head-portrait">资格证</text>
				<text class="explanatory-note">{{search.courseName}}</text>
			</view>
			<text class="line" v-if="!flag"></text>
			<view  class="header-container-message" v-if="!flag">
				<text class="head-portrait">层次/方向</text>
				<text class="explanatory-note">{{search.directionLevelName}}</text>
			</view>
			<text class="line" v-if="!flag"></text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				courseId:'',
				imgUrl:'',
				search:{
					phone:'',
					birthday:'',
					politicalOutlook:'',
					idCardAddress:'',
					collegeName:'',
					periodName:'',
					courseName:'',
					directionLevelName:'',
					studentStatus:''
				},
				tkMsg:'',
				flag:false
			}
		},
		
		methods:{
			
		},
		onLoad(option){
				this.courseId= option.courseId
				if(this.courseId==491){
					this.flag = true
				}
				this.imgUrl = this.$store.state.userInfo.smalImageUrl
				this.tkMsg = this.$store.state.userInfo.tkMsg
				
			uni.request({
				url: this.baseUrl + '/gxplatform/manager/gxstudent/getStudentInfo',
				data: {
					 courseId: this.courseId
				},
				method: "GET",
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+this.tkMsg
				},
				success: (res) => {
					let list = JSON.parse(JSON.stringify(res.data.data))
					if (list ==null) { //res.data.data为空时请求数据失败
						uni.showToast({
							icon: 'none',
							title: res.data.message
						});
						return
					} else {
						this.search = {
							phone : list.phone,
							birthday : list.birthday,
							politicalOutlook : list.politicalOutlook,
							idCardAddress:list.idCardAddress,
							collegeName:list.collegeName,
							periodName:list.periodName,
							courseName:list.courseName,
							directionLevelName:list.directionLevelName,
							studentStatus:list.studentNo
						}
						
					}
				},
			})
		}
	}
</script>

<style scoped lang="scss">
	.header-container-message{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 106rpx;
		.head-portrait{
			font-size:30rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(51,51,51,1);
			line-height: 140rpx;
		}
		.explanatory-note{
			font-size:28rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(149,149,149,1);
			line-height: 140rpx;
			margin-right: 30rpx;
			
		}
	}
	.login-png{
		width:86rpx;
		height:86rpx;
		background:rgba(29,32,137,1);
		border-radius:50%;
		margin-top: 25rpx;
		margin-right: 30rpx;
	}
	.line{
		width:749rpx;
		height:2rpx;
		background:rgba(243,243,243,1);
	}
	.footer{
		display: flex;
				flex-direction: row;
				margin-top: 30rpx;
				.explain{
					width:8rpx;
					height:36rpx;
					background:rgba(41,45,160,1);
				}
				.personal-information{
					width:131rpx;
					height:32rpx;
					font-size:32rpx;
					font-family:Microsoft YaHei;
					font-weight:bold;
					color:rgba(31,31,31,1);
					margin: -3rpx 0 1rpx 20rpx;
		;
				}
	}
	.header{
		display: flex;
		flex-direction: row;
		margin-top: 30rpx;
		.explain{
			width:8rpx;
			height:36rpx;
			background:rgba(41,45,160,1);
		}
		.personal-information{
			width:131rpx;
			height:32rpx;
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:bold;
			color:rgba(31,31,31,1);
			margin: -3rpx 0 1rpx 20rpx;
;
		}
	}
	.personal-data{
		margin-left: 31rpx;
	}
</style>
