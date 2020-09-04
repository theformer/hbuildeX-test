<template>
	<view class="living">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		           <view class="left" :style="'top:' + demo.top + 'px'">
		               <view class="iconfont icon-xiaoxi">
									<image src="/static/questionBank/LOGO.png" class="logo"></image>
								</view>
		           </view>
							<text>{{certificate}}</text>
		           <!-- <u-select v-model="show" :list="certificateList"  @confirm="confirm" mode=single-column></u-select> -->
							<image class="changeCertificate" src="/static/questionBank/cut.png" v-if="certificateList.length>1" @click="changeCertificate"></image>
		</view>
		<view class="header">
			<view class="header-saw">
				<image src="/static/live/living.png" class="header-img"></image>
				<text class="header-text" @click="linkToLiveReview">直播精彩回顾</text>
			</view>
			<view class="header-saw">
				<image src="/static/live/recorded.png" class="header-img"></image>
				<text class="header-text" @click="linkToRecorded">录播课程</text>
			</view>
		</view>
		<view>
			<view class="mian-header">
			<image src="/static/live/rectangle.png" class="tip"></image>
			<text class="tip-text">直播</text>
			</view>
			<view class="living-course" v-for="(item,index) in livingCourse"  v-if="livingCourse.length!==0">
				<view class="living-teacher">
					<view class="living-teacher-left">
						<image src="/static/live/time.png" class="lt-png"></image>
						<text class="lt-text">{{item.hoursBtime}}</text>
						<view class="time">{{item.minuteEtime}}</view>
					</view>
					<view class="living-teacher-center">
						<image class="content" src="/static/live/recordedTwo.png"></image>
					</view>
					<view  class="living-teacher-right-top">
						<navigator url="">
							<text class="living-teacher-right">{{item.title}}</text>
						</navigator>

						<view class="living-teacher-foot">
							<view class="foot-left">
								<image class="photo" src="/static/live/head.png"></image>
								<view class="xiaban">
									<text class="teacher-name">讲师:{{item.teacherName}}</text>
								</view>
								
							</view>
							<view class="foot-right">
								<view class="footer-living" v-if="item.state ==1">
										<image src="/static/live/subscribe.png" class="foot-png"></image>
										<text  class="btn-font">请预约</text>
								</view>
								<view class="footer-living-now"  v-if="item.state ==2">
										<image src="/static/live/liveLiving.png" class="foot-png"></image>
										<text class="btn-font">直播中</text>
								</view>
								<view class="footer-living-save" v-if="item.state ==3">
									<text class="save-text">已结束</text>
								</view>
								<view class="footer-living-playblock" v-if="item.state ==4" @click="">
									<text>回放</text>
								</view>
							<!-- 	<view class="footer-living-now" v-if="item.state ==4">
										<image src="../../static/live/组 69.png"  class="foot-png"></image>
										<text  class="btn-font">直播中</text>
								</view> -->
							</view>
						</view>
					
					</view>
				</view>
			</view>
		</view>
		<view class="footer-"  @click="linkToLiveReview" v-if="livingCourse.length!==0">
			<text class="footer-footer">
				— 更多尽在直播回顾 —
			</text>
		</view>
		<view v-if="livingCourse.length==0" class="nullVal">
			<image src="/static/noData.png" class="dataNull"></image>
		</view>
		<view v-if="livingCourse.length==0" class="bottom-text">暂无数据</view>
	</view>
</template>

<script>
	// import {uniCard} from '@dcloudio/uni-ui/lib/uni-card/uni-card.vue'
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default{
		// components:{uniCard}
	 computed: mapState(['hasLogin','userInfo']),  
		data(){
			return{
				courseId:'',
				tkMsg:'',
				oggg:{},
				livingCourse:[],
				show:false,
				certificateList:[],
				certificate:'',
				certificateId:'',
				demo: {
				    top: 0,
				    height: 0
				},
				date:'',
				listCourse:[],
				subCourseId:'', 		//课程ID 默认传第一个
				typeId:{}				,//存储是否从证书页面过来的
				courseList:[]			//识别是否存储了值的
			}
		},
		created(){
		            const demo = uni.getMenuButtonBoundingClientRect()
		            this.demo.top = demo.top
		            this.demo.height = demo.height
		},
		methods:{
			...mapMutations(['logout']),  
			linkToLiveReview(){
				uni.navigateTo({
					url:'live-review?courseId='+this.certificateId,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			linkToRecorded(){
				uni.navigateTo({
					url:'recorded-videos?courseId='+this.certificateId,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			changeCertificate(){
				//courseIdType 1为课程 2为直播 3为题库
				uni.navigateTo({
					url:'../course/switch-certificate?courseId='+this.certificateId+'&courseIdType='+2,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			confirm(e) {
				this.certificate = e[0].label  //导航栏显示的证书名
				this.certificateId = e[0].value	//导航栏显示的证书id
				uni.request({
					url: this.baseUrl + '/gxplatform/front/videoteach/getTenVideoTeach',
					data: {
						courseId:this.certificateId,
					},
					method: "GET",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+this.tkMsg
					},
					success: (res) => {
						let list = JSON.parse(JSON.stringify(res.data.data))
						if (list ==null) { //res.data.data为空时请求数据失败
							this.livingCourse = []
							return
						} else {
						list.forEach((ele)=>{
							ele.hoursBtime=ele.eTime.substring(5,10),
							ele.minuteEtime=ele.bTime.substring(10,16)
							ele.teacherName = ele.teacherName.substring(0,5)
						})
							this.livingCourse = list
						}
					},
					
					
				})
			},
		},
		onLoad(){
		},
		onShow(){
			this.typeId = uni.getStorageSync('typeId')
			this.courseList = uni.getStorageSync('courseList')
			this.certificateList =[]
			this.tkMsg = this.$store.state.userInfo.tkMsg
			let userInfo = uni.getStorageSync('userInfo')
			userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id,
					extra:ele.childrens
				})
			})
			
			//判断是否从从切换证书页面过来
			if(this.typeId.courseIdType ==2){
				this.courseList = []
				for(let i = 0;i<this.certificateList.length;i++){
					if(this.typeId.courseId ==this.certificateList[i].value){
						this.courseList.push(this.certificateList[i]),
						this.listCourse = this.certificateList[i].extra,
						this.courseName = this.certificateList[i].extra[0].name,
						this.subCourseId = this.certificateList[i].extra[0].id,
						this.certificate = this.certificateList[i].label
						this.certificateId = this.certificateList[i].value
					}
				}
				
				if(this.courseList.length>1){
					this.courseList.splice(0,1)
				}
				   uni.setStorageSync('courseList',this.courseList)
			}else if(this.courseList.length>0){
				this.certificate = this.courseList[0].label
				this.certificateId = this.courseList[0].value
				this.listCourse = this.courseList[0].extra //存储课程tabs
				this.courseName = this.courseList[0].extra[0].name //课程初始为教师证下课目下的第一个值
				this.subCourseId = this.courseList[0].extra[0].id
			}else{
				this.certificate = this.certificateList[0].label
				this.certificateId = this.certificateList[0].value
				this.listCourse = this.certificateList[0].extra //存储课程tabs
				this.courseName = this.certificateList[0].extra[0].name //课程初始为教师证下课目下的第一个值
				this.subCourseId = this.listCourse[0].id
			}
			uni.request({
				url: this.baseUrl + '/gxplatform/front/videoteach/getTenVideoTeach',
				data: {
					 courseId: this.certificateId
				},
				method: "GET",
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+this.tkMsg
				},
				success: (res) => {
					let list = JSON.parse(JSON.stringify(res.data.data))
					if (list ==null) { //res.data.data为空时请求数据失败
						return
					} else {
						list.forEach((ele)=>{
							ele.hoursBtime=ele.eTime.substring(5,10),
							ele.minuteEtime=ele.bTime.substring(10,16)
							ele.teacherName = ele.teacherName.substring(0,5)
						})
						this.livingCourse = list
					}
				},
			})
		}
	}
</script>

<style scoped lang="scss">
	.nullVal{
		display: flex;
		align-items: center;
		margin-top: 45%;
		.dataNull{
			width: 374rpx;
			height: 390rpx;
			margin: 0 auto;
		}
	}
	.bottom-text{
		text-align: center;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:50rpx;
	}
	.changeCertificate{
		width: 24rpx;
		height: 20rpx;
		margin-left: 11rpx;
	}
	.logo{
		width: 99rpx;
		height: 30rpx;
	}
	.demo{
	       position: relative;
	       display: flex;
	       align-items: center;
	       justify-content: center;
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
	.footer-{
		text-align: center;
		margin: 20rpx;
	}
	.footer-footer{
		width:249rpx;
		height:25rpx;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(103,103,103,1);
	}
	.photo{
		width: 71rpx;
		height: 72rpx;
	}
	.xiaban{
		
	}
	.teacher-name{
		width:137rpx;
		height:24rpx;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(103,103,103,1);
	}
	.living-teacher-right{
		height:35rpx;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(18,18,18,1);
		display:block; 
		width: 389rpx;
		overflow: hidden; 
		white-space: nowrap; 
		text-overflow: ellipsis; 
		
	}
	.content{
		width: 14rpx;
		height: 110rpx;
		
	}
	.lt-text{
		width:72rpx;
		height:24rpx;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(88,88,87,1);
		margin-left: 14rpx;
	}
	.time{
		width:76rpx;
		height:25rpx;
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(18,18,18,1);
		margin-left: 36rpx;
	}
	.lt-png{
		width: 28rpx;
		height: 28rpx;
	}
	.living-teacher-right-top{
		display: flex;
		flex-direction: column;
		margin-left: 34rpx;
		margin-top: 51rpx;
	}
	.living-teacher-foot{
		display: flex;
		flex-direction: row;
		margin-top: 21rpx;
		justify-content: space-between;
		.foot-left{
			display: flex;
			flex-direction: row;
			.xiaban{
				margin-top: 20rpx;
				margin-left: 10rpx;
			}
		}
		.foot-right{
			
			.footer-living-save{
				background-color: #666666;
				color:rgba(255,255,255,1);
				width: 117rpx;
				height: 43rpx;
				text-align: center;
				border-radius: 8rpx;
				margin-top: 15rpx;
				.save-text{
					font-size:20rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(255,255,255,1);
				}
			}
			.footer-living-playblock{
				width: 117rpx;
				height: 43rpx;
				text-align: center;
				border-radius: 8rpx;
				background-color: #FFFFFF;
				border: 1rpx solid #4388FF;
				color: #000000;
				margin-top: 20rpx;
			}
			.footer-living-now{
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				background-color: #1d2088;
				color: #fff;
				border: 2rpx solid #1d2088;
				width: 117rpx;
				height: 43rpx;
				border-radius: 8rpx;
				margin-top: 20rpx;
				.foot-png{
					width: 20rpx;
					height: 20rpx;
					margin: auto 0;
				}
				.btn-font{
					line-height: 36rpx;
					font-size:20rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:#fff;
				}
			}
			.footer-living{
				display: flex;
				flex-direction: row;
				justify-content: space-around;
				// background-color: #1d2088;
				// color: #fff;
				border: 2rpx solid #1d2088;
				width: 117rpx;
				height: 43rpx;
				border-radius: 8rpx;
				margin-top: 20rpx;
				.foot-png{
					width: 20rpx;
					height: 20rpx;
					margin: auto 0;
				}
				.btn-font{
					line-height: 36rpx;
					font-size:20rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(103,103,103,1);
				}
			}
		}
	}
	.living-teacher-left{
		margin: 50rpx 53rpx;
	}
	.living-teacher-center{
		margin: 50rpx 0;
	}
	.living-teacher{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	.living-course{
		height:190rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius:10px;
		display: flex;
		flex-direction: row;
		margin-top:31rpx ;
	}
	.tip-text{
		width:65rpx;
		height:32rpx;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(31,31,31,1);
	}
	.tip{
		display: inline-block;
		width: 8rpx;
		height: 37rpx;
		margin: 43rpx 20rpx 0 30rpx;
	}
	.header-text{
		margin-left: 27rpx;
		line-height: 140rpx;
		width:166rpx;
		height:27rpx;
		font-size:28rpx;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(53,53,55,1);
	}
	.header-img{
		line-height: 120rpx;
		width:53rpx;
		height:42rpx;
	}
	.header-saw{
		text-align: center;
		width:328rpx;
		height:120rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius:16px;
		margin: 38rpx 16rpx 32rpx 32rpx;
	}
	.header{
		display: flex;
		flex-direction: row;
	}
	.living{
		margin: 30rpx;
	}
</style>
