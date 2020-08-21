<template>
	<view class="switch-certificate">
		<view class="header">
			<image src="../../static/course/banner拷贝.png" mode="" class="header-img"></image>
		</view>
		<view class="main">
			<view class="mian-item" v-for="(item,index) in subCourse" :key="index" @click="linkToCourse(item)">
				<image :src="item.iconUrl" class="item-png"></image>
				<text class="item-text">{{item.name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				subCourse:[],
				courseId:'',
				courseIdType:'',
				mime:''
			}
		},
		methods:{
			linkToCourse(item){
				uni.setStorageSync('courseObj', '');
				this.courseId = item.id
				let typeId ={
					courseId:this.courseId,
					courseIdType:this.courseIdType
				}
				uni.setStorageSync('typeId', typeId);
				if(this.courseIdType==1){
					uni.switchTab({
						url:'course',
						animationType: 'pop-in',
						animationDuration: 300
					})
				}else if(this.courseIdType==2){
					uni.switchTab({
						url:'../live/living',
						animationType: 'pop-in',
						animationDuration: 300
					})
				}else if(this.courseIdType==3){
					this.$courses.courses = []
					uni.switchTab({
						url:'../questionBank/questionBank',
						animationType: 'pop-in',
						animationDuration: 300
					})
				}else if(this.mime ==1){
					uni.navigateTo({
						url:'../my/learning-progress?courseId='+typeId.courseId,
						animationType: 'pop-in',
						animationDuration: 300
					})	
				}

				
			}
		},
		onShow() {
			//获取所有证书
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/app/course/getAppCourseList',
				data: {
					 
				},
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+this.tkMsg
				},
				success: (res) => {
					let list = JSON.parse(JSON.stringify(res.data.data))
					if (list ==null) { //res.data.data为空时请求数据失败
						return
					} else {
						this.subCourse = list
					}
				},
			})
		},
		onLoad(option) {
			this.courseIdType =option.courseIdType
			this.mime=option.mime
		}
	}
</script>

<style scoped lang="scss">
	.header{
		margin: 30rpx;
		.header-img{
			margin: auto 0;
			width: 690rpx;
			height: 262rpx;
		}
	}
	.main{
		display: flex;
		flex-direction: row;
		flex-wrap:wrap; 
		margin: 30rpx;
		.mian-item{
			display: flex;
			flex-direction: column;
			margin: 40rpx;
			.item-png{
				width: 66rpx;
				height: 66rpx;
				margin: 0 auto;
			}
			.item-text{
				font-size:24rpx;
				font-family:Source Han Sans CN;
				font-weight:400;
				color:rgba(53,53,55,1);
			}
		}
	}
</style>
