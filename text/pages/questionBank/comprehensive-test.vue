<template>
	<!-- 综合测验 -->
	<view class="comprehensive-test">
		<view class="test-paper" v-for="(item,index) in list" v-if="list.length>0">
			<view class="test-left">
				<text class="test-paper-topic">{{item.paperName}}</text>
			</view>
			<view class="right-button">
				 <button @click="" size="mini" class="btn"  @click="startTopic(item)">开始做题</button> 
			</view>
		</view>
		<view v-if="list.length==0" class="nullVal">
			<image src="../../static/组 7.png" class="dataNull"></image>
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
				questionSelfList:[],//判断是否试卷中含有试题
				paperId:''			//试卷ID
			}
		},
		methods:{
			//点击开始做题跳转到答题卡页面
			startTopic(item){
				this.paperId = item.id
				uni.request({
						url: this.baseUrl + '/gxplatform/tk/examination/getZHQuestionListByPaperId',
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
							if (list ==null) { //res.data.data为空时请求数据失败
								uni.showToast({
									icon: 'none',
									title: res.data.message
								});
								return
							} else {
								uni.setStorageSync('topiclist', list.questionList);
								console.log(this.subCourseId,'我是科目id',this.paperId,'我是试卷id')
								uni.navigateTo({
									url: 'answer-sheet?subCourseId='+this.subCourseId+'&paperId='+this.paperId,
									animationType: 'pop-in',
									animationDuration: 300
								})
							}
						},
				})
			},
		},
		onShow() {
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/tk/examination/getZHPaperListBySubCourseId.do',
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
						// this.questionSelfList = this.list[0].questionList
						// if(this.questionSelfList.length==0){
						// 	setTimeout(function(){
						// 		uni.navigateBack({delta:1,
						// 		animationType: 'pop-out',
						// 		animationDuration: 200
						// 	})},1000)
						// }
					}
				}
			})
		},
		onLoad(option) {
			this.subCourseId = option.subCourseId
		}
	}
</script>

<style scoped lang="scss">
	.comprehensive-test{
		margin: 30rpx;
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
		.test-paper{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin: 10rpx;
			.test-left{
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				width: 420rpx;
				.test-paper-topic{
					font-size:30rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(34,34,34,1);
					line-height: 66rpx;
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
					margin-top: 15rpx;
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
