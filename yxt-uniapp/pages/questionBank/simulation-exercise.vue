<template>
	<!-- 模拟练习 -->
	<view class="simulation-exercise">
		<view class="test-paper" v-for="(item,index) in list">
			<view class="test-left">
				<text class="test-paper-topic">{{item.paperName}}</text>
				<view class="pic"  v-if="courseId.length==0">
					<text  class="pic-style">考试人数 : {{item.radioNum}}</text>
				</view>
			</view>
			<view class="right-button">
				 <button  size="mini" class="btn"  @click="startTopic(item)">开始做题</button> 
			</view>
		</view>
		<view v-if="list.length==0" class="nullVal">
			<image src="/static/noData.png" class="dataNull"></image>
		</view>
		<view v-if="list.length==0" class="bottom-text">暂无数据</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				subCourseId:'',	//科目id
				list:[],		//初始化题目集合
				chapterId:'',	//章节id
				questionIds:[],	//题目id值集合
				tkMsg:'',
				paperId:''
			}
		},
		methods:{
			//点击开始做题跳转到答题卡页面
			startTopic(item){
				if(this.courseId!=491){
						uni.request({
							url: this.baseUrl + '/gxplatform/front/tk/getPaperQuestionByPaperId',
							data:{
								paperId:1,
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
										url: 'answer-sheet',
										animationType: 'pop-in',
										animationDuration: 300
									})
								}
							},
						})
					}else{
						this.paperId = item.id
						uni.request({
								url: this.baseUrl + '/gxplatform/tk/examination/getMNQuestionListByPaperId',
								data:{
									paperId:this.paperId
								},
								method:"GET",
								header: {
									'content-type': 'application/x-www-form-urlencoded',
									'Cookie':'JSESSIONID='+this.tkMsg
								},
								success: (res) => {
									let list = JSON.parse(JSON.stringify(res.data.data))
									console.log(list,777)
									if (list ==null) { //res.data.data为空时请求数据失败
										uni.showToast({
											icon: 'none',
											title: res.data.message
										});
										return
									} else {
										uni.setStorageSync('topiclist', list.questionList);
										uni.navigateTo({
											url: 'answer-sheet?paperId='+this.paperId,
											animationType: 'pop-in',
											animationDuration: 300
										})
									}
								},
						})
					}
			
			},
		},
		onShow() {
			this.tkMsg = this.$store.state.userInfo.tkMsg
			if(this.subCourseId&&this.courseId){
				if(this.courseId!=491){
					uni.request({
						url: this.baseUrl + '/gxplatform/front/tk/getPaperListBySubCourseId',
						data: {
							subCourseId:this.subCourseId,
							paperType:1
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
						}
					})
				}else{
					uni.request({
						url: this.baseUrl + '/gxplatform/tk/examination/getMNPaperListBySubCourseId',
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
								setTimeout(function(){
									uni.navigateBack({delta:1,
									animationType: 'pop-out',
									animationDuration: 200
								})},1000)
								return
							} else {
								this.list = list	
							}
						}
					})
				}
			}
			
		},
		onLoad(option) {
			this.subCourseId = option.subCourseId
			this.courseId = option.courseId
		}
	}
</script>

<style scoped lang="scss">
	.simulation-exercise{
		margin: 30rpx;
		.bottom-text{
			text-align: center;
			font-size:32rpx;
			font-family:Microsoft YaHei;
			font-weight:400;
			color:rgba(102,102,102,1);
			line-height:50rpx;
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
		.test-paper{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			
			.test-left{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 10rpx 0;
				.test-paper-topic{
					font-size:30rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(34,34,34,1);
				}
				.pic{
					font-size:22rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(102,102,102,1);
					margin: 23rpx 0;
					.pic-style{
						margin-right: 30rpx;
					}
				}
			}
			.right-button{
				.btn{
					width:180rpx;
					height:45rpx;
					background:rgba(29,32,137,1);
					border-radius:23rpx;
					color: #fff;
					line-height: 42rpx;
				}
			}
			
			
			.line{
				width:690rpx;
				height:2rpx;
				background:rgba(221,221,221,1);
			}
		}
	}
</style>
