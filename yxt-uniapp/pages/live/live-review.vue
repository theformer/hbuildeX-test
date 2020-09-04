<template>
	<view class="live-review">
		<view>
			<view class="header">
					<video :src="videoSrc" 
					id="myVideo"
					class="video-style"
						controls
						show-fullscreen-btn 
						show-play-btn 
						show-mute-btn
						@play="beginClick"
						@pause="suspendClick"
						@ended="endClick"
						@error="errorClick"
						></video>
				</view>
				<view class="course-explain">
					<view class="course-explain-st">
						<image src="/static/live/video.png" class="subCourse"></image>
						<text class="subject">{{courseName}}</text>
					</view>
					<button size="mini" class="btn" @click="chooseSubject">切换科目</button>
				</view>
				<u-popup mode="bottom" class="dia-height"  v-model="popupShow" :value="index" border-radius="14" mask mask-close-able=true>
					<view class="choose-subject">选择科目</view>
					<view  class="btn-class">
						<view  v-for="(item,index) in listCourse" :key="index">
							<button :class="stringing == item.name?'line-grey':'bg-haveFinashed'" :value="item.name" @click="coursesVal(index)" size="mini">{{item.name}}</button>				
						</view>
					</view>
					<button class="saveClick" @click="saveClick">保存</button>
				</u-popup>
				<view class="course-main" v-if="videos.length>0">
					<view class="introduce">
						<text class="introduce-text">直播回顾</text>
					</view>
					<view class="mtt" v-for="(item,index) in videos" :key="index" :index="index">
						<view class="mtt-left">
							<view class="left-time" >
								<text>{{item.upLoadTime}}</text>
							</view>
							<view class="png-yuan">
								<image src="/static/live/square.png" class="mtt-left-img"></image>
								<image src="/static/live/dottedLine.png" class="mtt-left-line" mode=""></image>
							</view>
							
							<view class="mtt-left-text"  @tap="changVideosClick(item)">
								<text>{{item.videoTitle}}</text>
							</view>
						</view>
						<view class="" @tap="changVideosClick(item)">
								<image src="/static/live/play.png" class="mtt-text"></image>
						</view>
					
					</view>
				</view>
		</view>
		<view v-if="videos.length==0">
			<view class="nullVal">
				<image src="/static/noData.png" class="dataNull"></image>
			</view>
			<view v-if="videos.length ==0" class="bottom-text">暂无数据</view>
		</view>
		
	</view>
</template>

<script> 
	export default{ 
		data(){
			return{
				 itemList: [],
				 videos:[],
				 videoSrc:'',			//视屏播放地址
				 subCourseId:'',			//科目ID
				 courseName:''				,//展示的科目名
				 popupShow:false,			//弹窗button集合
				 listCourse:[],
				 certificateList:[]			,//存储证书和证书下的课程集合
				 courseIndex:'',			//当前科目所在位置索引
				 courseId:''				,//判断是在哪个科目
				 stringing:''				//存储一个变量，为listCourse[index]的值，判断是否点击变色
			}
		},
		OnReady:function(res){
			//获取video上下文videoContext对象
			this.videoContext = uni.createVideoContext('myVideo')
			//进入全屏状态
			this.videoContext.requestFullScreen()
		},
		methods:{
			//弹窗内点击按钮改变科目值
			coursesVal(index){
				this.courseIndex = index
				this.subCourseId = this.listCourse[index].id
				this.stringing = this.listCourse[this.courseIndex].name
			},
			//点击打开弹窗
			chooseSubject(){
				this.popupShow = true;
				if(this.stringing ==''){
					this.stringing = this.listCourse[0].name
				}else{
					this.subCourseId = this.listCourse[this.courseIndex].id
				}
				
			},
			//点击开始播放
			changVideosClick(item){
				this.videoSrc=item.videoUrl
			},
			//点击保存按钮切科目切换视频
			saveClick(val){
				this.popupShow = false
				this.courseName = this.listCourse[this.courseIndex].name
				
				uni.request({
					url: this.baseUrl + '/gxplatform/front/video/getVideosBySubCourseId',
					data: {
						subCourseId:this.subCourseId,
						materiaProper:4
					},
					method: "GET",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+this.tkMsg
					},
					success: (res) => {
						let list = JSON.parse(JSON.stringify(res.data.data))
						if (res.data.code ==1 &&res.data.data.length>0 ) { //res.data.data为空时请求数据失败
							list.forEach((ele)=>{
								ele.videoUrl=ele.videoUrl.replace('tk.360xkw.com','s1.v.360xkw.com')
								ele.upLoadTime =ele.upLoadTime.substring(0,10)
							})
							this.videos = list
							this.videoSrc = list[0].videoUrl
						} else {
							this.videos = []
							this.videoSrc = ''
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
							return
						}
					},
				})
			},
			showClick(){
				
			},
			heddinClick(){
				
			},
			beginClick(){   //当点击开始/继续时触发paly事件
				
			},
			suspendClick(){	//点击暂停播放触发事件
				
			},
			endClick(){		//当播放完时触发ended事件
				
			},
			errorClick(){		//视频播放出错时触发
				
			}
			
		},
		onLoad(option) {
			this.courseId = option.courseId
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo')
			userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id,
					extra:ele.childrens
				})
			})
			for(let i = 0;i<this.certificateList.length;i++){
					if(this.courseId ==this.certificateList[i].value){
						this.listCourse = this.certificateList[i].extra
						this.courseName =this.certificateList[i].extra[0].name		//默认名字
						this.subCourseId = this.certificateList[i].extra[0].id		//默认传值课程Id
					}
			}
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/front/video/getVideosBySubCourseId',
				data: {
					subCourseId:this.subCourseId,
					materiaProper:4
				},
				method: "GET",
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+this.tkMsg
				},
				success: (res) => {
					let list = JSON.parse(JSON.stringify(res.data.data))
					if (res.data.code ==1 &&res.data.data.length>0) { //res.data.data为空时请求数据失败
						list.forEach((ele)=>{
							ele.videoUrl=ele.videoUrl.replace('tk','s1.v'),
							ele.upLoadTime =ele.upLoadTime.substring(0,10)
						})
					
						this.videos = list
						this.videoSrc = list[0].videoUrl
					} else {
						this.videos =[]
						this.videoSrc = ''
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
</script>

<style scoped lang="scss">
	.saveClick{
		width: 90%;
		border-radius: 50rpx;
		background: rgb(29, 32, 139);
		color: #fff;
	}
	.course-main{
		.introduce{
			height: 72rpx;
			background: rgb(244, 244, 244);
			margin-top: 20rpx;
			.introduce-text{
				height:24rpx;
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(102,100,100,1);
				line-height: 72rpx;
				margin-left: 30rpx;
			}
		
		}
	}
	.dia-height{
		height: 60%;
		.choose-subject{
			font-size:30rpx;
			font-family:Microsoft YaHei;
			font-weight:bold;
			color:rgba(0,0,0,1);
			margin: 52rpx 0 32rpx 28rpx;
		}
		.btn-class{
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			.line-grey{
				background-color:  #dfe0fc;
				color: #000000;
				margin: 15rpx 20rpx;
			}
			.bg-haveFinashed{
				background-color: #ececed;
				margin: 15rpx 20rpx;
			}
		}
	}
	.course-explain{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.course-explain-st{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			.subCourse{
			width: 40rpx;
			height: 28rpx;
			margin: auto 30rpx;
			
		}
			.subject{
				line-height: 20px;
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(102,100,100,1);
				margin-left: 15rpx;
			}
		}
		.btn{
			line-height: 20px;
			border-radius: 5px;
			height: 43rpx;
			margin-right: 30rpx;
			border:2rpx solid rgba(29,32,137,1);
			color: #1D2089;
		}
	}
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
	.mtt{
		margin: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.mtt-left{
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
			height: 40rpx;
			.left-time{
				font-size: 24rpx;
			}
			.png-yuan{
				display: flex;
				flex-direction: column;
				margin-top: 10rpx;
				height: 40rpx;
				overflow: hidden;
				.mtt-left-line{
					width: 2rpx;
					height: 40rpx;
					margin-left: 26rpx;
				}
				.mtt-left-img{
					width: 15rpx;
					height: 15rpx;
					margin: 0 20rpx;
				}
			}
			.mtt-left-text{
				width: 400rpx;
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(102,100,100,1);
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
			}
		}
		.mtt-text{
			width: 28rpx;
			height: 29rpx;
		}
	}
	.header{
		height: 420rpx;
		width: 100%;
		overflow: hidden;
		.video-style{
			width: 100%;
			height: 400rpx;
			position: fixed;
			top: 0;
			overflow-y: auto;
			z-index: 9999;
		}
	}
	
</style>
