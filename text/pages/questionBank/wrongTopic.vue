<template>
	<!-- 错题本 -->
	<view class="wrongTopic">
		<view class="test-paper" v-for="(item,index) in list">
			<view class="test-left">
				<text class="test-paper-topic">{{item.name}}</text>
				<view class="pic">
					<text  class="pic-style">错题数 : {{item.wrongNum}}</text>
				</view>
			</view>
			<view class="right-button">
				 <button @click="" size="mini" class="btn"  @click="startTopic(item)">查看错题</button> 
			</view>
		</view>
		<view v-if="list.length==0" class="nullVal">
			<image src="../../static/组 7.png" class="dataNull"></image>
		</view>
		<view v-if="list.length==0" class="bottom-text">暂无错题</view>
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
				type:'',
				topiclist:[] 	//存储的错提集合
			}
		},
		methods:{
			//点击开始做题跳转到答题卡页面
			startTopic(item){
				this.questionIds = []
				for(let i =0;i<item.questions.length;i++){
					this.questionIds.push(item.questions[i].id)
				}
				this.chapterId = item.id
				uni.request({
						url: this.baseUrl + '/gxplatform/tk/wrongreview/getWrongQuestionLibList',
						data:{
							type:this.type,
							subCourseId:this.subCourseId,
							chapterId:this.chapterId
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
								this.topiclist =[] ;
								list.forEach((ele) =>{
									ele.questionLibs.forEach((e)=>{
										this.topiclist.push(e)
									})
								})
								uni.setStorageSync('topiclist', this.topiclist);
								uni.navigateTo({
									url: 'answer-sheet?type='+this.type+'&subCourseId='+this.subCourseId+'&isShow=1',
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
			if(this.type==1){
				uni.request({
					url: this.baseUrl + '/gxplatform/tk/wrongreview/getZgzWrongListBySubCourseId',
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
					}
				})
			}else{
				uni.request({
					url: this.baseUrl + '/gxplatform/tk/wrongreview/getChapterWrongReviewsListBySubCourseId',
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
					}
				})
			}
			
		},
		onLoad(option) {
			this.subCourseId = option.subCourseId
			this.type= option.type
		}
	}
</script>

<style scoped lang="scss">
	.wrongTopic{
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
				width: 480rpx;
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
