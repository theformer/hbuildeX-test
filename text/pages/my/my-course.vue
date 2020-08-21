<template>
	<view class="my-course">
		<view class="course" v-for="(item,index) in course">
			<image :src="item.picUrl||'../../static/my/组 70.png'" class="course-img"></image>
			<view class="course-text">
				<text class="course-name">{{item.kcname}}</text>
				<text class="time">{{item.etime}}</text>
				<button class="btn" size="mini" @click="linkToCourse(item)">开始学习</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				course:[],
				imgUrl:'',
				etime:'',
				tkMsg:'',
				courseObj:{
					
				},
				
			}
		},
		methods:{
			//点击开始学习想课程页面传值
			linkToCourse:function(item){
				let courseType = true
				uni.setStorageSync('typeId', '');
				this.courseObj={
					courseId:item.courseId,
					subCourseId:item.subCourseId,
					courseType:courseType
				}
				uni.setStorageSync('courseObj', this.courseObj);
				uni.switchTab({
					url:'../course/course',
					animationType: 'pop-in',
					animationDuration: 300
				})
			}
		},
		onShow() {
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/front/tk/getMyItemList',
				data: {
					
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
						this.course = list
						// for(let i = 0 ;i <list.length;i++){
						// 	this.course = list[i].subCourseList
						// 	this.etime = list[i].etime
						// }
					}
				},
			})
		}
	}
</script>

<style scoped lang="scss">
	
	.my-course{
		margin-left:29rpx 0 32rpx 32rpx;
		.course{
			width:686rpx;
			height:210rpx;
			background:rgba(255,255,255,1);
			box-shadow:0px 2px 10px 0px rgba(229,229,229,0.68);
			border-radius:10px;
			display: flex;
			flex-direction: row;
			margin: 14rpx auto;
			.course-img{
				width: 237rpx;
				height: 173rpx;
				margin: 13rpx 21rpx 24rpx 24rpx;
			}
			.course-text{
				margin:  28rpx 28rpx 28rpx 0;
				.course-name{
					display: block;
					width:345rpx;
					height:54rpx;
					font-size:28rpx;
					font-family:Source Han Sans CN;
					font-weight:500;
					color:rgba(53,53,55,1);
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
				}
				.time{
					display: block;
					font-size: 22rpx;
					color: #C8C8C8;

				}
			}
		}
		.btn{
			width: 150rpx;
			height: 41rpx;
			background: #1d2089;
			border-radius: 21px;
			color: #fff;
			font-size: 22rpx;
			line-height: 41rpx;
			margin-top: 30rpx;
			// margin-top: 32rpx;
		}
	}
</style>
