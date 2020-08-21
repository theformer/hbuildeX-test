<template>
	<view class="learning-progress">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		           <view class="left" :style="'top:' + demo.top + 'px'">
		               <!-- <view class="iconfont icon-xiaoxi">
									<image src="../../static/questionBank/学考网LOGO-01.png" class="logo"></image>
								</view> -->
		           </view>
					    <image src="../../static/my/back.png" class="back-png" mode="" @click="back"></image>
				  <view class="">
				  	<text>{{certificate}}</text>
					<image class="changeCertificate" src="../../static/questionBank/切换.png" v-if="progress.length>1" @click="changeCertificate"></image>
				  </view>
					<view class="">
						<image src="../../static/my/next.png" class="hidden" mode=""></image>
					</view>
		</view>
		<view class="line-course" v-for="(item,index) in progress">
			<text class="course">{{item.name}}</text>
			<view class="mtr">
				<view class="linkToCourse" @click="linkToSchedule(item)">
					<text>查看详情</text>
				</view>
				<image src="../../static/my/返回 拷贝.png" class="img"></image>
			</view>
			<u-line-progress active-color="#1C2287" :percent="item.percent" round	class="line-progress"></u-line-progress>
			<text class="line"></text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				progress:[],
				tkMsg:'',
				demo: {
				    top: 0,
				    height: 0
				},
				certificate:'', 		//证书名称
				certificateList:[],		
				courseList:[]
			}
		},
		created () {
		            const demo = uni.getMenuButtonBoundingClientRect()
		            this.demo.top = demo.top
		            this.demo.height = demo.height
		        },
		methods:{
			linkToSchedule(item){
				uni.navigateTo({
					url:'schedule-details?subCourseId='+item.id,
					animationType: 'pop-in',
					animationDuration: 300
				})	
			},
			back:function(e){
				uni.navigateBack({
					delta:1
				})
			},
			//切换证书名为courseIdType
			changeCertificate(){
				//courseIdType 1为课程 2为直播 3为题库
				uni.navigateTo({
					url:'../course/switch-certificate?mime=1',
					animationType: 'pop-in',
					animationDuration: 300
				})	
			},
		},
		onLoad(option) {
			this.certificateId = option.courseId
		},
		onShow(){
			let userInfo = uni.getStorageSync('userInfo')
			this.courseList = uni.getStorageSync('courseList')
			this.certificateList = []
			this.tkMsg = this.$store.state.userInfo.tkMsg
			if(this.certificateId==''||this.certificateId==undefined){
				userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id,
					extra:ele.childrens
					})
				})
				this.certificate = this.certificateList[0].label
				this.certificateId = this.certificateList[0].value
			}else{
				userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id,
					extra:ele.childrens
					})
				})
				for(let i = 0;i<this.certificateList.length;i++){
					if(this.certificateId ==this.certificateList[i].value){
						this.courseList.push(this.certificateList[i]),
						this.certificate = this.certificateList[i].label
						this.certificateId = this.certificateList[i].value
					}
				}
				if(this.courseList.length>1){
					this.courseList.splice(0,1)
				}
				uni.setStorageSync('courseList',this.courseList)
			}
			uni.request({
				url: this.baseUrl + '/gxplatform/front/learning/getSubCourse',
				data: {
					courseId:this.certificateId
				},
				method: "POST",
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
						this.progress = list
					}
				},
			})
		}
	}
</script>

<style lang="scss" scoped>
	.hidden{
		width: 1rpx;
		height: 1rpx;
	}
	.back-png{
		width: 32rpx;
		height: 41rpx;
	}
	.changeCertificate{
		width: 24rpx;
		height: 20rpx;
		margin-left: 11rpx;
	}
	.course{
	font-size:30rpx;
	font-family:Microsoft YaHei;
	font-weight:400;
	color:rgba(50,51,55,1);
	}
	.line-progress{
		margin-top: 20rpx;
		display: block;
	}
	.line{
		width: 690rpx;
		height: 2rpx;
		background: #dddddd;
		display: block;
		margin-top: 40rpx;
	}
	.img{
		width: 30rpx;
		height: 30rpx;
		margin-left: 49rpx;
	}
	.mtr{
		display: flex;
		margin-left: 72%;
	}
	.img{
		width: 19rpx;
		height: 33rpx;
	}
	.linkToCourse{
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:#1D2089;
	}
	.line-course{
		margin-top: 30rpx;
	}
	.learning-progress{
		margin: 35rpx;
	}
	.demo{
	       position: relative;
	       display: flex;
	       align-items: center;
	       justify-content: space-between;
	       background: #fff;
	       font-size: 26rpx;
				margin-bottom: 29rpx;
	       .left{
	           float: left;
	           position: absolute;
	           width: max-content;
	           height: max-content;
	           top: 0;
	           bottom: 0;
	           left: 20rpx;
	           margin: auto;
	           .iconfont{
	               color: #3C3C3C;
	           }
	       }
	}
</style>
