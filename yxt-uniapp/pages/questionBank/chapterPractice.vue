<template>
	<view class="chapterPractice">
		<view class="test-paper" v-for="(item,index) in list">
			<view class="test-left">
				<text class="test-paper-topic">{{item.name}}</text>
				<view class="pic">
					<text  class="pic-style">单选 : {{item.radioNum}}</text>
					<text  class="pic-style">多选 : {{item.checkboxNum}}</text>
					<text  class="pic-style">判断 : {{item.judgeNum}}</text>
					<text  class="pic-style">简答 : {{item.shortAnswerNum}}</text>
				</view>
			</view>
			<view class="right-button">
				 <button @click="" size="mini" class="btn"  @click="startTopic(item)">开始做题</button> 
			</view>
		</view>
		<view v-if="list.length==0" class="nullVal">
			<image src="/static/noData.png" class="dataNull"></image>
		</view>
		<view class="bottom-text" v-if="list.length==0">暂无数据</view>
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
				tkMsg:''
			}
		},
		methods:{
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
									url: 'answer-sheet?subCourseId='+this.subCourseId+'&type=2',
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
				url: this.baseUrl + '/gxplatform/front/tk/getChapterListBySubCourseId',
				data: {
					subCourseId:this.subCourseId,
					type:2
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
		},
		onLoad(option) {
			this.subCourseId = option.subCourseId
		}
	}
</script>

<style scoped lang="scss">
	.chapterPractice{
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
				overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				width: 420rpx;
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
