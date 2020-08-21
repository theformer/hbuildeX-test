<template>
	<view class="course">
		<view class="demo" :style="'height:' +  demo.height + 'px;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		           <view class="left" :style="'top:' + demo.top + 'px'">
		               <view class="iconfont icon-xiaoxi">
									<image src="../../static/questionBank/学考网LOGO-01.png" class="logo"></image>
								</view>
		           </view>
							<text>{{certificate}}</text>
							<image class="changeCertificate" src="../../static/questionBank/切换.png" v-if="certificateList.length>1" @click="changeCertificate"></image>
		</view>
		<view class="course-head">
			<video class="video" :src="videoSrc"
			 autoplay="true" 
			 controls 
			 show-fullscreen-btn 
			 show-play-btn 
			 show-mute-btn
			@error="videoErrorCallback"
			 ></video>
			<view class="course-explain">
				<text class="subject">{{courseName}}</text>
				<button size="mini" class="btn" @click="chooseSubject">切换科目</button>
			</view>
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
				<u-collapse class="collapse-conteinar">
					<u-collapse-item   style="font-size: 24rpx !important;height: 24rpx !important;font-family: Microsoft YaHei !important;font-weight: 400 !important;"  class="collapseName" v-for="(item,index) in videos" :title="item.name" :key="index">
						<view class="item-style" v-for="(videoItem,videoIndex) in item.videos" :key="videoIndex" @click="changVideosUrl(videoItem)">{{videoItem.videoTitle}}</view>
					</u-collapse-item>
				</u-collapse>
			</view>
		</view>
		<view v-else class="nullVal">
			<image src="../../static/组 7.png" class="dataNull"></image>
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
				courseList:[]	,//当切换完课程存储课程集合
			}
		},
		created () {
		            const demo = uni.getMenuButtonBoundingClientRect()
		            this.demo.top = demo.top
		            this.demo.height = demo.height
		        },
		methods:{
			//视频错误时发生
			videoErrorCallback: function(e) {
			    uni.showModal({
			        content: '视频有误',
			        showCancel: false
			    })
			},
			//点击切换video的地址
			changVideosUrl(videoItem){
				this.videoSrc = videoItem.videoUrl
				
			},
			//切换证书名为courseIdType
			changeCertificate(){
				//courseIdType 1为课程 2为直播 3为题库
				uni.navigateTo({
					url:'switch-certificate?courseId='+this.certificateId+'&courseIdType='+1,
					animationType: 'pop-in',
					animationDuration: 300
				})	
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
									e.videoUrl=e.videoUrl.replace('tk','s1.v')
								})
							})
							this.videos = list
							this.videoSrc = list[0].videos[0].videoUrl
						} else {
							this.videos = []
							this.videoSrc=''
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
							return
						}
					},
				})
			},
			chooseSubject(){
				this.popupShow = true;
				if(this.stringing ==''){
					this.stringing = this.listCourse[0].name
				}else{
					this.subCourseId = this.listCourse[this.courseIndex].id
				}
				
			},
			coursesVal(index){
				this.courseIndex = index
				this.subCourseId = this.listCourse[index].id
				this.stringing = this.listCourse[this.courseIndex].name
			},
		},
		onShow(){
			this.typeId = uni.getStorageSync('typeId')
			let userInfo = uni.getStorageSync('userInfo')
			this.courseObj = uni.getStorageSync('courseObj')
			this.courseList = uni.getStorageSync('courseList')
			this.certificateList = []
			this.videoSrc=''
			userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id,
					extra:ele.childrens
				})
			})
			//判断是否从切换证书页面过来
			if(this.typeId.courseIdType ==1){
				this.courseList =[]
				for(let i = 0;i<this.certificateList.length;i++){
					if(this.typeId.courseId ==this.certificateList[i].value){
						console.log(this.courseList,'讲道理不应该会报错啊')
						this.courseList.push(this.certificateList[i]),
						this.listCourse = this.certificateList[i].extra,
						this.courseName = this.certificateList[i].extra[0].name,
						this.subCourseId = this.certificateList[i].extra[0].id,
						this.certificate = this.certificateList[i].label
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
				}else if(this.courseList.length>0){
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
							ele.videos.forEach((e)=>{
								e.videoUrl=e.videoUrl.replace('tk.360xkw.com','s1.v.360xkw.com')
							})
						})
						this.videos = list
						this.videoSrc = list[0].videos[0].videoUrl
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
	.item-style{
		font-size:26rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(102,100,100,1);
		margin-top: 10rpx;
	}
	.collapseName{
		height:24rpx;
		font-size:24rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		
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
	.video{
		height: 400rpx;
		width: 100%;
	}
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
			// width: 119rpx;
			height: 43rpx;
			margin-right: 30rpx;
			border:2rpx solid rgba(29,32,137,1)
		}
	}
	.course{
		margin: 30rpx 0 ;
	}
</style>
