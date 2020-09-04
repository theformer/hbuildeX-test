<template>
	<view class="recorded-videos">
		<view class="course-head">
			<video class="video" 
			:src="videoSrc"
			id="video"
			ref="video"
			controls 
			show-fullscreen-btn 
			show-play-btn 
			show-mute-btn
			:initial-time="initialTime"
			@error="videoErrorCallback"			
			@timeupdate="timeupdateClick"		
			@play="playClick"
			@pause="pauseClick"
			@ended="endedClick"
			 ></video>
		</view>
		<view class="course-explain">
			<text class="subject">{{courseName}}</text>
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
		<view class="course-main" v-if="videos.length!==0">
			<view class="introduce">
				<text class="introduce-text">精讲视频</text>
			</view>
			<view class="mtt">
				<u-collapse class="collapse-conteinar" ref="collapse">
					<u-collapse-item  :open="item.open"   class="collapseName" v-for="(item,index) in videos" :title="item.name" :key="index">
						<view v-for="(videoItem,videoIndex) in item.videos" :key="videoIndex" @click="changVideosUrl(videoItem,videoIndex)">
							<view class="collapseName-item">
								<view class="collapse-conteinar-left">
									<view class="okkkk">
										<image src="/static/course/playing.png" mode="" class="playing-png"   v-if="textClick==videoItem.videoTitle"></image>
										<image src="/static/course/zbPlaying.png" mode=""   class="zb-png"  v-else></image>					
									</view>
									<view class="titleText"><text class="titleTextCol">{{videoItem.videoTitle}}</text></view>
								</view>
								<view class="collapse-conteinar-right">
									<image src="/static/live/play.png" class="playing" mode=""></image>
								</view>
							</view>
							<view class="line"></view>
						</view>
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>
		<view v-else class="nullVal">
			<image src="/static/noData.png" class="dataNull"></image>
		</view>
		<view v-if="videos.length ==0" class="bottom-text">暂无数据</view>
	</view>
</template>

<script>
	export default{
		
		data(){
			return{
				videoSrc:'',
				index:0,
				popupShow:false,
				tkMsg:'',
				subCourseId:'',
				videos:[],
				initialTime:1,			//视频初始化开始时间
				courseName:'',
				courseId:'',
				courseNameState:'',
				courseIdState:'',
				demo: {
				    top: 0,
				    height: 0
				},
				certificateList:[],
				certificate:'',
				certificateId:'',
				listCourse:[],
				show:false,
				courseIndex:'' 		,//切换科目的索引值
				typeId:{}			,//从切换证书页面拿到的courseId
				courseObj:{}		,//存储从我的课程进来的科目id和证书id
				stringing:''		,//存储课程的中间变量
				textClick:'',
				courseList:[]	,//当切换完课程存储课程集合
				videoId:''			,//录播视频标号Id
				itemIdVal:'',
				userId:''			,//用户id
				itemId:[],			//当前切换视频id
				startTime:0		,//后端返的开始时间
				realTimeOfWeb:0	,//前端计算的播放时长
				studyTime:0			,//学习时长（秒）
				studyprogress:0 	,//学习进度(秒)
				watchTime:0,		
				duration:0,			//总时长
				pauseTime:0			,//点击切换到别的时间段存储
				oneId:''			,//当你点击暂停时向里面添加一个此时的id
				seeTime:[]			,//存储衣蛾当前的播放时间
				listIndex:[]		,//存储当前时间
				subCourse:''		//从进度详情页面进入存储的id值
			}
		},
		onReady:function(res){
			this.videoContext = uni.createVideoContext('video', this) 
		},
		
		methods:{
			addWatchTime:function() {
			    this.studyTime += 0.25;
			},
			//点击播放按钮
			playClick:function(e){
				let _this = this
				_this.watchTime=setInterval(function () {
				    _this.addWatchTime();
				}, 250)
				_this.getAllPlayVideo()
				console.log(_this.watchTime,'我是当前进度条时间',this.studyTime)
			},
			//暂停按钮
			pauseClick:function(e){
				if(this.watchTime){
					clearInterval(this.watchTime)
					this.watchTime = 0
				}
				this.saveWatchRecordFun()
				this.studyTime=0;
				this.itemId.push(this.oneId)
			},
			//结束按钮
			endedClick:function(e){
				this.studyTime=0;
				if(this.watchTime){
					clearInterval(this.watchTime)
					this.watchTime = 0
				}
			},
			//视频错误时发生
			videoErrorCallback: function(e) {
			    uni.showModal({
			        content: '视频有误',
			        showCancel: false
			    })
				this.studyTime=0;
				this.watchTime = 0
			},
			//进度条发生变化
			timeupdateClick:function(e){
				// e.detail.currentTime = this.pauseTime
				// this.initialTime = e.detail.currentTime
				// e.detail.duration = this.duration
			},
			//录播学习添加记录
			saveWatchRecordFun:function(e){
				let timestamp = new Date().getTime()
				this.realTimeOfWeb = timestamp - this.startTime
				console.log(this.itemId,'我是当前项')
				if(this.itemId.length >1){
					//根据存储的科目id值进行判断，如果俩个id一样表明同一个视频，不一样存储之前看的那个视频
					if(this.itemId[this.itemId.length-1]!==this.itemId[this.itemId.length-2]){
						this.itemIdVal = this.itemId[this.itemId.length-2]
						this.watchTime = this.studyTime + this.initialTime
					}else{
						this.itemIdVal = this.itemId[this.itemId.length-1]
						for(let i = 0;i<this.listIndex.length;i++){
							for(let j=0;j<this.listInde[j].length;j++){
								if(this.itemIdVal = this.listInde[j].id){
									this.watchTime = this.listInde[j].watchTime +this.studyTime
								}
							}
						}
					}
				}else{
					let stringId =  this.itemId
					this.itemIdVal = stringId[0]
					this.watchTime = this.studyTime + this.initialTime
				}
				if(this.studyTime>1 && this.duration>1){
					 if(this.watchTime>this.duration){
						 this.watchTime =  this.studyTime
						}
						
					uni.request({
						url:this.baseUrl+'/gxplatform/front/learning/updateVideoLearningProgress',
						data:{
							studyTime:parseInt(this.studyTime),	//学习时间
							watchTime:parseInt(this.watchTime),//进度条时间
							duration:parseInt(this.duration),				//视频总时长
							realTimeOfWeb:this.realTimeOfWeb,	//前端计算的视频播放时长
							startTime:this.startTime,			//后台记录开始播放时长
							videoId:this.itemIdVal				,//视频id
							
						},
						method: "POST",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Cookie':'JSESSIONID='+this.tkMsg
						},
						success: (res) => {
							if(res.code ==1){
								return
							}else{
						
							}
						}
					})
				 }
				
			},
			//跳转到别的页面向服务器发送数据
			getAllPlayVideo:function(){
				if(this.itemId.length >1){
					//根据存储的科目id值进行判断，如果俩个id一样表明同一个视频，不一样存储之前看的那个视频
					if(this.itemId[this.itemId.length-1]!==this.itemId[this.itemId.length-2]){
						this.itemIdVal = this.itemId[this.itemId.length-2]
					}else{
						this.itemIdVal = this.itemId[this.itemId.length-1]
					}
				}else{
					let stringId =  this.itemId
					this.itemIdVal = stringId[0]
				}
				uni.request({
					url:this.baseUrl+'/gxplatform/front/learning/saveStartTimeBeforePlay',
					data:{
						userId:this.userId,
						videoId:this.itemIdVal
					},
					method: "POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+this.tkMsg
					},
					success: (res) => {
						if(res.data.code==1){
							this.startTime = res.data.data
						}else{
							return
						}
					},
				})
			},
			//点击切换video的地址
			changVideosUrl(videoItem,videoIndex){
				clearInterval(this.watchTime)
				console.log(videoItem,'我是当前项')
				this.textClick = videoItem.videoTitle
				this.oneId = videoItem.id
				this.itemId.push(videoItem.id)
				if(videoItem.duration.length>0){
					this.duration = videoItem.duration
						this.duration = this.duration.split(':')
						if(this.duration.length==3){
							this.duration =parseInt(this.duration[0]*3600)+parseInt(this.duration[1]*60)+parseInt(this.duration[2]);
						}else if(this.duration.length==2){
							this.duration =parseInt(this.duration[0]*60)+parseInt(this.duration[1]);
						}else{
							this.duration =parseInt(e.duration[0])
						}
				}
				let itemName = videoItem.videoTitle
				//播放视频钱，服务端存储当前时间
				let timestamp = new Date().getTime()
				this.realTimeOfWeb = timestamp - this.startTime
				this.getAllPlayVideo()
				//更新接口
				if(this.certificateId!=491){
					uni.request({
						url: this.baseUrl + '/gxplatform/front/video/getChapterVideosBySubCourseId',
						data: {
							subCourseId:this.subCourseId
						},
						method: "GET",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Cookie':'JSESSIONID='+this.tkMsg
						},
						success: (res) => {
							if(res.data.code==1){
								let list = res.data.data
								this.listIndex =  res.data.data
								list.forEach((ele)=>{
									ele.videos.forEach(e=>{
										if(itemName ==e.videoTitle){
											this.initialTime = e.watchTime
											this.videoContext.seek(this.initialTime)
										}
									})
								})
							}else{
								return
							}
						},
					})
				}else{
					uni.request({
						url: this.baseUrl + '/gxplatform/front/learning/getAllChapterVideosBySubCourseId',
						data: {
							subCourseId:this.subCourseId
						},
						method: "POST",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Cookie':'JSESSIONID='+this.tkMsg
						},
						success: (res) => {
							if(res.data.code==1){
								let list = res.data.data.chapterVideosList
								list.forEach(ele=>{
									ele.videoList.forEach(e=>{
										if(itemName ==e.videoTitle){
											this.initialTime = e.watchTime
											this.videoContext.seek(this.initialTime)  
										}
									})
								})
							}else{
								return
							}
						},
					})
				}
			},
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
							console.log(this.videos,'好家伙我不会没有任何变动把')
							this.videoSrc = this.videos[0].videos[0].videoUrl
							this.videos[0].open = true
							this.textClick = this.videos[0].videos[0].videoTitle
							this.itemId.push(this.videos[0].videos[0].id)
							this.$nextTick(() => {
							this.$refs.collapse.init()
							})
						}else{
							this.videos = []
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
							return
						}
					}
				})
			},
			chooseSubject(){
				this.popupShow = true;
				if(this.stringing ==''){
					this.stringing = this.listCourse[0].name
				}else{
					if(this.listCourse[this.courseIndex].id){
						this.subCourseId = this.listCourse[this.courseIndex].id
					}
				}
			},
			coursesVal(index){
				this.courseIndex = index
				this.subCourseId = this.listCourse[index].id
				this.stringing = this.listCourse[this.courseIndex].name
			},
		},
		onLoad:function(option){
			this.subCourse = option.subCourse
			this.subCourseId = option.subCourseId
		},
		onShow(){
			this.typeId = uni.getStorageSync('typeId')
			let userInfo = uni.getStorageSync('userInfo')
			this.courseObj = uni.getStorageSync('courseObj')
			this.courseList = uni.getStorageSync('courseList')
			this.certificateList = []
			this.videoSrc=''
			this.userId = this.$store.state.userInfo.id
			userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id,
					extra:ele.childrens
				})
			})
			
			//判断是否从切换证书页面过来
			if(this.typeId.courseIdType ==1&&this.subCourse==undefined){
				this.courseList =[]
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
			}else{
				if(this.courseObj.courseType ===true){
					this.subCourseId = this.courseObj.subCourseId
					this.certificateId = this.courseObj.courseId 
					for(let i =0; i<this.certificateList.length;i++){
						if(this.certificateId ==this.certificateList[i].value){
							this.listCourse =this.certificateList[i].extra
							this.certificate = this.certificateList[i].label
							for(let j =0;j<this.certificateList[i].extra.length;j++){
								if(this.subCourseId ==this.certificateList[i].extra[j].id){
									this.courseName = this.certificateList[i].extra[j].name
								}
							}
						}
					}
				}else if(this.subCourse!=undefined&&this.subCourse){
					let _this = this
					_this.certificateList.forEach(ele=>{
						ele.extra.forEach(e=>{
							if(_this.subCourseId==e.id){
								_this.certificate =ele.label
								_this.certificateId = ele.value
								_this.listCourse=ele.extra
								_this.courseName = e.name
							}
						})
					})
				}else if(this.courseList.length>0&&this.subCourse==undefined){
					this.certificate = this.courseList[0].label
					this.certificateId = this.courseList[0].value
					this.listCourse = this.courseList[0].extra //存储课程tabs
					this.courseName = this.courseList[0].extra[0].name //课程初始为教师证下课目下的第一个值
					this.subCourseId = this.courseList[0].extra[0].id
				}else{
					this.subCourseId = this.certificateList[0].extra[0].id
					this.certificate = this.certificateList[0].label
					this.certificateId = this.certificateList[0].value
					this.listCourse = this.certificateList[0].extra //存储课程tabs
					this.courseName = this.certificateList[0].extra[0].name //课程初始为教师证下课目下的第一个值
					//第一次进入课程页面直接存储id值
					uni.setStorageSync('courseList',[this.certificateList[0]])
				}
			}
			
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/front/video/getChapterVideosBySubCourseId',
				data: {
					subCourseId:this.subCourseId
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
							ele.open = false
							ele.videos.forEach((e)=>{
								e.videoUrl=e.videoUrl.replace('tk.360xkw.com','s1.v.360xkw.com')
							})
						})
						this.videos = list
						this.$nextTick(() => {
						this.$refs.collapse.init()
						})
						if(this.videos.length>0&&this.subCourse==undefined){
							uni.request({
								url: this.baseUrl + '/gxplatform/front/video/getLatestVideoLogByStudentId',
								data: {
									courseId:this.certificateId
								},
								method: "GET",
								header: {
									'content-type': 'application/x-www-form-urlencoded',
									'Cookie':'JSESSIONID='+this.tkMsg
								},
								success: (res) => {
									if(res.data.code ==1&&res.data.data!=null){
										res.data.data.videoUrl=res.data.data.videoUrl.replace('tk.360xkw.com','s1.v.360xkw.com')
										this.videoSrc = res.data.data.videoUrl
										this.initialTime  = res.data.data.watchTime
										this.videoId  = res.data.data.videoId
										this.oneId = res.data.data.videoId	
										this.subCourseId =  res.data.data.subcourseId
										this.itemId.push(this.videoId)
										console.log(this.itemId,'好家伙啊',this.videoId)
										this.certificateList.forEach(ele=>{
											ele.extra.forEach(e=>{
												if(this.subCourseId ==e.id){
													this.listCourse = ele.extra,
													this.courseName = e.name,
													this.certificate = ele.label
													this.certificateId =ele.value
												}
											})
										})
									uni.request({
										url: this.baseUrl + '/gxplatform/front/video/getChapterVideosBySubCourseId',
										data: {
											subCourseId:this.subCourseId
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
													ele.open = false
													ele.videos.forEach((e)=>{
														e.videoUrl=e.videoUrl.replace('tk.360xkw.com','s1.v.360xkw.com')
													})
												})
												this.videos = list
												this.videos.forEach(ele =>{
													ele.videos.forEach(e=>{
														if(e.id ==this.videoId){
															ele.open = true
															this.textClick = e.videoTitle
															
															e.duration = e.duration.split(':')
															if(e.duration.length==3){
																e.duration =parseInt(e.duration[0]*3600)+parseInt(e.duration[1]*60)+parseInt(e.duration[2])
															}else if(e.duration.length==2){
																e.duration =parseInt(e.duration[0]*60)+parseInt(e.duration[1])
															}else{
																e.duration =parseInt(e.duration[0])
															}
															this.duration =e.duration
														}
													})
												})
												this.$nextTick(() => {
												this.$refs.collapse.init()
												})
											}
										},
									})
									}
								}
							})
						}else{				//
							if(this.videos.length>0){
								for(let i=0;i<this.videos.length;i++){
									if(this.videos[i].videos.length>0){
										for(let j=0;j<this.videos[i].videos.length;j++){
											if(this.subCourse ==this.videos[i].videos[j].id){
											this.videoSrc = this.videos[i].videos[j].videoUrl
											this.videos[i].open = true
											this.textClick = this.videos[i].videos[j].videoTitle
											this.itemId.push(this.subCourse)
											}
										}
									}
									
								}
							}
							
						}
						
					} else {
						this.videos =[]
						this.videoSrc=''
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
	.course-head{
		height: 420rpx;
		width: 100%;
		overflow: hidden;
		.video{
			width: 100%;
			height: 400rpx;
			position: fixed;
			top: 0;
			overflow-y: auto;
			z-index: 9999;
		}
	}
	.line{
		width: 600rpx;
		height: 1px;
		background: #E0E0E0;
		margin: 0 auto;
	}
	.collapseName-item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		height: 87rpx;
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
	.collapseName{
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		display: flex;
		flex-direction: column;
	}
	.collapse-conteinar{
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
	.collapse-conteinar-right{
		margin-right: 30rpx;
		line-height: 87rpx;
		.playing{
			height: 28rpx;
			width: 28rpx;
		}
	}
	.collapse-conteinar-left{
		margin-left: 30rpx;
		display: flex;
		flex-direction: row;
		line-height: 87rpx;
		.okkkk{
			.playing-png{
			width: 20rpx;
			height: 26rpx;
			}
			.zb-png{
				width: 14rpx;
				height: 87rpx;
			}
		}
		.titleText{
			margin-left: 30rpx;
			.titleTextCol{
				display: block;
				line-height: 87rpx;
			}
			
		}
	}
	.click-finish{
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:#1d2088;
	}
	.item-style{
		
	}
	.bottom-text{
		text-align: center;
		font-size:32rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,102,102,1);
		line-height:50rpx;
	}
	.line-grey{
		background-color:  #dfe0fc;
		color: #000000;
		margin: 15rpx 20rpx;
	}
	.bg-haveFinashed{
		background-color: #ececed;
		margin: 15rpx 20rpx;
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
	.mtt{
		margin: 30rpx;
	
	}
	.title{
		margin-left: 30rpx;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,100,100,1);
	}
	.main-big{
		display: flex;
		flex-direction: row;
		margin-left: 30rpx;
	}
	.main-style{
		display: flex;
		flex-direction: column;
		
	}
	.column-line{
		width:2rpx;
		height:70rpx;
		border:1px solid rgba(224,224,224,1);
		margin-left: 4rpx;
	}
	.video-png{
		width: 15rpx;
		height: 15rpx;
	}
	.popup-button{
		margin-left: 30rpx;
		margin-bottom: 15rpx;
		
	}
	.click-popup-button{
		margin-left: 30rpx;
		margin-bottom: 15rpx;
		background-color: rgb(29, 32, 139);
		color: #fff
	}
	.course-main{
		// margin: 30rpx;
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
	.saveClick{
		width: 90%;
		border-radius: 50rpx;
		background: rgb(29, 32, 139);
		color: #fff;
	}
	// .video{
	// 	height: 400rpx;
	// 	width: 100%;
	// }
	.course-explain{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.subject{
			line-height: 20px;
			font-size:24rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,100,100,1);
			margin-left: 30rpx;
		}
		.btn{
			line-height: 20px;
			border-radius: 5px;
			height: 43rpx;
			margin-right: 30rpx;
			border:2rpx solid rgba(29,32,137,1)
		}
	}
	.recorded-videos{
	}
</style>
