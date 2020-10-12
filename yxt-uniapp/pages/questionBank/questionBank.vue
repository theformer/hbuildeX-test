<template>
	<view class="questionBank">
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
			<u-tabs class="tabs" 
			v-if="opggg===true"
			bar-height="6" 
			active-color="#1d2088" 
			bar-width="50" 
			:list="listCourse" 
			:is-scroll="true" 
			:current="current" 
			@change="changeCurrent">
			</u-tabs>
			<image src="/static/questionBank/sum.png" @click="sumQuestionClick"  class="sum"></image>
		</view>
		<text class="line"></text>
		<view class="container">
			<view class="container-column" @click="linkToChapter" v-if="status">
				<image class="img-with" src="/static/questionBank/individualPractice.png"></image>
				<text>章节练习</text>
			</view>
			<view class="container-column" @click="linkToDaily" v-if="status">
				<image class="img-with" src="/static/questionBank/comprehensiveTest.png"></image>
				<text>每日一练</text>
			</view>
			<view class="container-column" @click="linkToComprehensive" v-if="!status">
				<image class="img-with" src="/static/questionBank/comprehensiveTest.png"></image>
				<text>综合测验</text>
			</view>
			<view class="container-column" @click="linkToIndividualPractice" v-if="!status">
				<image class="img-with" src="/static/questionBank/individualPractice.png"></image>
				<text>单项练习</text>
			</view>
			<view class="container-column" @click="linkToExam">
				<image class="img-with" src="/static/questionBank/zzz.png"></image>
				<text>历年真题</text>
			</view>
			<view class="container-column" @click="linkToSimulation">
				<image class="img-with" src="/static/questionBank/simulationExercise.png"></image>
				<text>模拟练习</text>
			</view>
			<view class="container-column" @click="wrongTopic">
				<image class="img-with" src="/static/questionBank/wrongTopic.png"></image>
				<text>错题本</text>
			</view>
		</view>
		<view class="footer" v-if="listCourse.length>0">
			<view class="footer-thead">
				<image class="footer-icon" src="/static/questionBank/tip.png"></image>
				<text class="thead" v-if="status">章节测试</text>
				<text class="thead" v-if="!status">阶段测试</text>
			</view>
			<view class="footer-container" v-for="(item,index) in list">
				<view class="topic">
					<view class="text-width">
						<text class="course" v-if="status">{{item.name}}</text>
						<text class="course" v-if="!status">{{item.paperName}}</text>
					</view>
			
					<view>
						<!-- <button size="mini" class="btn-white" @click="linkToAnswer(item)" v-if="!status">查看解析</button> -->
						<button size="mini" class="btn" @click="selfTopic(item)" v-if="!status">开始做题</button>
						<button size="mini" class="btn" @click="startTopic(item)" v-if="status">开始做题</button>
					</view>
				</view>
				<text class="number-test" v-if="status">考试人数:{{item.chapterTestExamNum}}</text>
			</view>
			<text class="line"></text>
		</view>
		<view class="" v-else>
			<view  class="nullVal">
			<image src="/static/noData.png" class="dataNull"></image>
			</view>
			<view  class="bottom-text">请添加课程</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				list: [],	//下面题目
				current:0,	//tabs下的索引值
				tkMsg:'',	//cookie值
				subCourseId:'',	//
				course:[],
				demo: {
				    top: 0,
				    height: 0
				},
				listCourse:[],  //tabs数据
				show:false,		//顶部导航栏弹框
				certificateList:[], 	//导航栏证书
				certificate:'',			//证书名称显示在导航栏的字段
				certificateId:'',		//证书Id
				courseId:'',			//存储的课程id值
				questionIds:[],			//开始做题需传过去取的id集合
				chapterId:'',			//章节Id
				type:'',
				typeId:{}				,//存储是否从切换证书页面过来的数据值
				selflist:[],
				status:false			,//courseId不等于491时为资格证
				courseList:[],
				opggg:true
				// apply:false
				
			}
		},
		created () {
		            const demo = uni.getMenuButtonBoundingClientRect()
		            this.demo.top = demo.top
		            this.demo.height = demo.height
		        },
		methods:{
			//点击添加题库
			sumQuestionClick(){
				console.log(this.subCourseId,'我是当前项')
				uni.navigateTo({
					url:'sum-question?courseId='+this.courseId+'&subCourseId='+this.subCourseId,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//自考跳转到查看解析页面
			linkToAnswer(){
				
			},
			//我是自考逻辑
			selfTopic:function(item){
				uni.navigateTo({
					url: 'answer-sheet?paperId='+item.id+'?subCourseId='+this.subCourseId,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//点击开始做题跳转到答题卡页面
			startTopic(item){
				this.questionIds = []
				for(let i =0;i<item.questions.length;i++){
					this.questionIds.push(item.questions[i].id)
				}
				this.chapterId = item.questions[0].chapterId
				this.questionIds = JSON.stringify(this.questionIds)
				this.questionIds = this.questionIds.replace("[", "");
				this.questionIds = this.questionIds.replace("]", "");
				this.questionIds = this.questionIds.replace(/},{/g, "}<gx>{");
				uni.request({
						url: this.baseUrl + '/gxplatform/front/tk/getChapterQuestionByIds',
						data:{
							chapterId:this.chapterId,
							questionIds:this.questionIds,
							subCourseId:this.subCourseId
						},
						method:"GET",
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
								uni.setStorageSync('topiclist', list);
								uni.navigateTo({
									url: 'answer-sheet?subCourseId='+this.courseId+'&type=3',
									animationType: 'pop-in',
									animationDuration: 300
								})
							}
						},
				})
			},
			changeCurrent(index){
				this.current = index
				this.subCourseId = this.listCourse[index].id
				if(this.courseId !=491){
						uni.request({
						url: this.baseUrl + '/gxplatform/front/tk/getChapterListBySubCourseId',
						data: {
							subCourseId:this.subCourseId,
							type:3
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
								this.list = []
								return
							} else {
								
								this.list = list
							}
						},
					})
				}else{
					uni.request({
						url: this.baseUrl + '/gxplatform/tk/examination/getJDPaperListBySubCourseId',
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
							if (list ==null) { //res.data.data为空时请求数据失败
								uni.showToast({
									icon: 'none',
									title: res.data.message
								});
								this.list = []
								return
							} else {
								this.list = list	
							}
						},
					})
				}
				
			},
			changeCertificate(){
				//courseIdType 1为课程 2为直播 3为题库
				uni.navigateTo({
					url:'../course/switch-certificate?courseId='+this.certificateId+'&courseIdType='+3,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//点击跳转到我的错题页面
			wrongTopic(){
				this.type = ''
				if(this.certificateId !== 491){
					this.type=1
				}else{
					this.type = ''
				}
				uni.navigateTo({
				    url:'wrongTopic?subCourseId='+this.subCourseId+'&type='+this.type,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			//跳转到历年真题
			linkToExam(){
				uni.navigateTo({
				    url:'exam-papers?subCourseId='+this.subCourseId+'&courseId='+this.courseId,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			//跳转到模拟练习
			linkToSimulation(){
				uni.navigateTo({
				    url:'simulation-exercise?subCourseId='+this.subCourseId+'&courseId='+this.courseId,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			
			//跳转到每日一练
			linkToDaily(){
				uni.navigateTo({
				    url: 'daily-practice?subCourseId='+this.subCourseId,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			//跳转到章节练习
			linkToChapter(){
				uni.navigateTo({
				    url:'chapterPractice?subCourseId='+this.subCourseId,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			//跳转到综合测验
			linkToComprehensive(){
				uni.navigateTo({
				    url:'comprehensive-test?subCourseId='+this.subCourseId,
					animationType: 'pop-in',
					animationDuration: 300
				});
			},
			//跳转到单项练习页面
			linkToIndividualPractice(){
				uni.navigateTo({
				    url:'individual-practice?subCourseId='+this.subCourseId,
					animationType: 'pop-in',
					animationDuration: 300
				});
			}
		},
		onShow() {
			this.certificateList =[]
			// this.current = 0
			this.tkMsg = this.$store.state.userInfo.tkMsg
			this.courseList = uni.getStorageSync('courseList')
			let userInfo = uni.getStorageSync('userInfo')
			this.typeId = uni.getStorageSync('typeId')
			userInfo.courses.forEach((ele) =>{
				this.certificateList.push({
					label:ele.name,
					value:ele.id,
					extra:ele.childrens
				})
			})
			this.listCourse =  this.$courses.courses
			this.opggg = false;
			//判断是否从切换证书页面登入进来
			if(this.typeId.courseIdType ==3){
				this.courseList =[]
				if(this.listCourse.length>0){
					for(let i= 0;i<this.listCourse.length;i++){
						if(this.subCourseId ==this.listCourse[i].id){
							this.current = i
						}
					}
					let a = this.listCourse.find(item=>item.id ==this.subCourseId)
					if(!a){
						this.current = 0
					}
					this.courseName = this.listCourse[this.current].name
					this.subCourseId = this.listCourse[this.current].id
				}else{
					this.subCourseId = ''
					this.courseName = ''
				}
				for(let i = 0;i<this.certificateList.length;i++){
					if(this.typeId.courseId ==this.certificateList[i].value){
						this.courseList.push(this.certificateList[i]),
						this.courseId= this.typeId.courseId,
						this.certificate =  this.certificateList[i].label
					}
				}
				uni.setStorageSync('courseList',this.courseList)
				if(this.courseList.length>1){
					this.courseList.splice(0,1)
				}
			}else if(this.courseList.length>0){ 
					this.certificate = this.courseList[0].label
					this.courseId = this.courseList[0].value
					this.certificateId = this.courseList[0].value
					if(this.listCourse.length>0){
						for(let i= 0;i<this.listCourse.length;i++){
							if(this.subCourseId ==this.listCourse[i].id){
								this.current = i
							}
						}
						let a = this.listCourse.find(item=>item.id ==this.subCourseId)
						if(!a){
							this.current = 0
						}
						this.courseName = this.listCourse[this.current].name //课程初始为教师证下课目下的第一个值
						this.subCourseId = this.listCourse[this.current].id
						var result = this.courseList[0].extra.some(item=>{
								if(this.listCourse[0].id ==item.id){
									return true
								}
							})
							if(!result){
								this.listCourse =[]
								this.$courses.courses =[]
							}
					}else{
						this.subCourseId = ''
					}
			}else{
				this.certificate = this.certificateList[0].label
				this.courseId = this.certificateList[0].value
				this.certificateId = this.certificateList[0].value
				this.courseName = this.listCourse[0].name //课程初始为教师证下课目下的第一个值
				this.subCourseId = this.listCourse[0].id
			}
			if(this.courseId !=491){
				this.status = true
			}else{
				this.status = false
			}
			if(this.listCourse.length ==0){
				this.subCourseId =''
			}
			if(this.courseId==491){
				if(this.subCourseId&&this.subCourseId!=''){
					uni.request({
						url: this.baseUrl + '/gxplatform/tk/examination/getJDPaperListBySubCourseId',
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
							if (list ==null) { //res.data.data为空时请求数据失败
								this.list = []
								return
							} else {
								this.list = list	
							}
						},
					})
				}
			}else{
				if(this.subCourseId&&this.subCourseId!=''){
					uni.request({
						url: this.baseUrl + '/gxplatform/front/tk/getChapterListBySubCourseId',
						data: {
							subCourseId:this.subCourseId,
							type:3
						},
						method: "GET",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Cookie':'JSESSIONID='+this.tkMsg
						},
						success: (res) => {
							let list = JSON.parse(JSON.stringify(res.data.data))
							if (list ==null) { //res.data.data为空时请求数据失败
								this.list = []
								return
							} else {
								this.list = list	
							}
						},
					})
				}
				
			}
			this.$nextTick(() => {
			      this.opggg = true;
			    });
			// this.apply = true
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
	.header{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		.tabs{
			width: 95%;
			overflow: hidden;
		}
		.sum{
			width: 27rpx;
			height: 26rpx;
			margin: auto 0;
		}
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
	.line{
		width:634rpx;
		height:1px;
		background:rgba(221,221,221,1);
	}
	.thead{
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(31,31,31,1);
	}
	.footer{
		margin-top: 40rpx;
		.footer-container{
			margin-left: 50rpx;
			margin-top: 50rpx;
			.topic{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				.text-width{
					height: 40rpx;
					width: 280rpx;
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					.course{
						font-size:24rpx;
						font-family:Microsoft YaHei;
						font-weight:bold;
						color:rgba(31,31,31,1);
					}
				}
				
				.btn-white{
					color: #1d2088;
					width: 140rpx;
					height: 45rpx;
					margin-right: 21rpx;
					font-size: 20rpx;
					border: 2rpx solid #1d2088;
					margin-right: 15rpx;
				}
				.btn{
					color: #FFFFFF;
					background-color: #1e1f8b;
					width: 135rpx;
					height: 45rpx;
					margin-right: 21rpx;
					font-size: 20rpx;
				}
			}
			.number-test{
				font-size:22rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(102,102,102,1);
				margin-top: 18rpx;
				display: block;
			}
		}
	}
	.footer-icon{
		width: 9rpx;
		height: 37rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
	}
	.line{
		width:750rpx;
		height:2rpx;
		background:rgba(221,221,221,1);
	}
	.container{
		margin-top: 30rpx;
		display: flex;
		flex-direction: row;
		justify-content: center ;
		box-shadow:0px 2px 10px 0px rgba(0, 0, 0, 0.1);
		border-radius:10px;
		.container-column{
			display: flex;
			flex-direction: column;
			margin-left: 20rpx;
			.img-with{
			width: 46.5rpx;
			height: 46.5rpx;
			margin-left: 20rpx;
			clear: both;
			display: block;
			margin: auto;
			}
		}
		
	}
	.questionBank{
		margin: 30rpx;
	}
</style>
