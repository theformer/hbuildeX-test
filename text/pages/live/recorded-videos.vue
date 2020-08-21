<template>
	<view class="recorded-videos">
		<view>
			<view class="header">
					<video :src="videoSrc" 
					class="video-style"
						controls
						autoplay
						loop
						show-fullscreen-btn 
						show-play-btn 
						enable-progress-gesture
						@play="beginClick"
						@pause="suspendClick"
						@ended="endClick"
						@fullscreenchange="fullScreenClick"
						@waiting="waitingClick"
						@error="errorClick"
						></video>
				</view>
				<view class="course-explain">
					<view class="course-explain-st">
						<image src="../../static/live/视频.png" class="subCourse"></image>
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
					<view class="mtt">
						<u-collapse class="collapse-conteinar">
							<u-collapse-item   style="font-size: 24rpx !important;height: 24rpx !important;font-family: Microsoft YaHei !important;font-weight: 400 !important;"  class="collapseName" v-for="(item,index) in videos" :title="item.name" :key="index">
								<view class="item-style" v-for="(videoItem,videoIndex) in item.videos" :key="videoIndex" @click="changVideosUrl(videoItem)">{{videoItem.videoTitle}}</view>
							</u-collapse-item>
						</u-collapse>
					</view>
				</view>
		</view>
		<view v-if="videos.length==0">
			<view class="nullVal">
				<image src="../../static/组 7.png" class="dataNull"></image>
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
				 stringing:'',
				 subName:''
			}
		},
		methods:{
			//点击开始播放
			beginClick(index){
				
			},
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
			//点击切换video的地址
			changVideosUrl(videoItem){
				this.videoSrc = videoItem.videoUrl
				
			},
			//点击保存按钮切科目切换视频
			saveClick(val){
				this.popupShow = false
				this.courseName = this.listCourse[this.courseIndex].name
				uni.request({
					url: this.baseUrl + '/gxplatform/front/video/getChapterVideosBySubCourseId',
					data: {
						subCourseId:this.subCourseId,
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
								ele.videos.forEach((e)=>{
									e.videoUrl=e.videoUrl.replace('tk.360xkw.com','s1.v.360xkw.com')
								})
							})
							this.videos = list
							
							this.videoSrc = list[0].videos[0].videoUrl
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
			fullScreenClick(){ //当视频进入和退出全屏时触发
				
			},
			waitingClick(){		//视频出现缓冲时触发
				
			},
			errorClick(){		//视频播放出错时触发
				
			}
			
		},
		onLoad(option) {
			this.courseId = option.courseId
			if(option.subCourse!=undefined){
				this.subCourseId = option.subCourse
				this.subName = uni.getStorageSync('subName')
			}	
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo')
			this.certificateList = []
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
					}else{
						for(let j= 0;j<this.certificateList[i].extra.length;j++){
							if(this.subName ==this.certificateList[i].extra[j].name){
								this.listCourse = this.certificateList[i].extra
								this.courseName =this.certificateList[i].extra[j].name
							}
						}
					}
			}
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/front/video/getChapterVideosBySubCourseId',
				data: {
					subCourseId:this.subCourseId,
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
							ele.videos.forEach((e)=>{
								e.videoUrl=e.videoUrl.replace('tk','s1.v')
							})
						})
						this.videos = list
						this.videoSrc = list[0].videos[0].videoUrl
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
		.collapse-conteinar{
			width: 100%;
			height:24rpx;
			font-size:24rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,100,100,1);
			.u-collapse-head{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(102,100,100,1)
			}
		}
	}
	.video-style{
		width: 100%;
		height: 400rpx
	}
</style>
