<template>
	<!-- 交卷 -->
	<view class="handPaper">
		<view class="handPaper-header">
			<u-circle-progress active-color="#1d2088" class="circleClass"  :percent="handPaper.score">
				<view class="u-progress-content">
					<text class="grade">{{handPaper.score}}</text>
					<text class="score">分</text>
				</view>
			</u-circle-progress>
			<view class="handPaper-header-foot">
				<button type="default" size="mini" class="lookAnswer" @click="startTopic">查看答案</button>
			</view>
		</view>
		<view class="handPaper-container">
			<view class="allPaper">
				<image src="/static/questionBank/file.png" class="tip-png"></image>
				<view class="tip-right">
					<text class="tip-right-text">全部</text>
					<text class="tip-right-total">{{handPaper.allQuestionCount}}题</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="allPaper">
				<image src="/static/questionBank/note.png" class="tip-png"></image>
				<view class="tip-right">
					<text class="tip-right-text">已做</text>
					<text class="tip-right-total">{{handPaper.didQuestionCount}}题</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="allPaper">
				<image src="/static/questionBank/right.png" class="tip-png"></image>
				<view class="tip-right">
					<text class="tip-right-text">做对</text>
					<text class="tip-right-total">{{handPaper.correctQuestionCount}}题</text>
				</view>
			</view>
			<view class="line"></view>
			<view class="allPaper">
				<image src="/static/questionBank/passingRate.png" class="tip-png"></image>
				<view class="tip-right">
					<text class="tip-right-text">正确率</text>
					<text class="tip-right-total">{{((handPaper.correctQuestionCount/handPaper.allQuestionCount)*100).toFixed(2)}}%</text>
				</view>
			</view>
		</view>
		<view class="gray"></view>
		<view class="footer">
			<view class="footer-head">
				<image src="/static/questionBank/light.png" mode="" class="footer-head-png"></image>
				<text class="footer-tip">专家建议</text>
			</view>
			<view class="footer-container">
				<text class="footer-container-text">{{tip}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				total:0,
				tip:'专家建议',
				handPaper:{},
				subCourseId:'',
				list:[],
				paperId:''
				
			}	
		},
		methods:{
				//点击开始做题跳转到答题卡页面
				startTopic(item){
					this.tkMsg = this.$store.state.userInfo.tkMsg
					let questionJson = uni.getStorageSync('question')
					uni.request({
						url: this.baseUrl + '/gxplatform/front/tk/getAnalysis',
						data:{
							questionJson:questionJson,
						},
						method:"GET",
						header: {
							'content-type': 'application/x-www-form-urlencoded',
							'Cookie':'JSESSIONID='+this.tkMsg
						},
						success: (res) => {
							this.list = JSON.parse(JSON.stringify(res.data.data))
							if (this.list ==null) { //res.data.data为空时请求数据失败
								uni.showToast({
									icon: 'none',
									title: res.data.message
								});
								return
							} else {
								for(let i = 0;i<this.list.length;i++){
										this.list[i].userAnswer =''
										if(this.list[i].a!=''&&this.list[i].a!=undefined){
											this.list[i].a = this.list[i].a.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].b!=''&&this.list[i].b!=undefined){
											this.list[i].b = this.list[i].b.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].c!=''&&this.list[i].c!=undefined){
											this.list[i].c = this.list[i].c.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].d!=''&&this.list[i].d!=undefined){
											this.list[i].d = this.list[i].d.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].e!=''&&this.list[i].e!=undefined){
											this.list[i].e = this.list[i].e.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].f!=''&&this.list[i].f!=undefined){
											this.list[i].f = this.list[i].f.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].g!=''&&this.list[i].g!=undefined){
											this.list[i].g= this.list[i].g.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].questionTitle!=''&&this.list[i].questionTitle!=undefined){
											this.list[i].questionTitle = this.list[i].questionTitle.replace(/<[^>]+>|&[^>]+;/g, '')
										}
										if(this.list[i].analyzeWord!=''&&this.list[i].analyzeWord!=undefined){
											this.list[i].analyzeWord =this.list[i].analyzeWord.replace(/<[^>]+>|&[^>]+;/g, '')
										}
								}
								uni.setStorageSync('analysis', this.list);
								uni.navigateTo({
									url: 'answer-sheet?subCourseId='+this.subCourseId+'&seeAnswer=1'+'&paperIds='+this.paperId,
									animationType: 'pop-in',
									animationDuration: 300
								})
							}
						},
					})
				},
		},
		onShow() {
			const inviteTwoRule = /^(0([.]([1-9]\d?|0[1-9])|$)|[1-9]\d{0,3}([.]\d{1,2}|$))$/;
			this.handPaper = uni.getStorageSync('handPaper')
			
			
		},
		onLoad(option){
			this.subCourseId = option.subCourseId
			this.type = option.type
			this.paperId = option.paperId
			console.log(this.paperId,'我是试卷id值',option)
		}
	}
</script>r

<style scoped lang="scss">
	.score{
		font-size:35rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(34,34,34,1);
		margin-top: 20rpx;
	}
	.grade{
		font-size:72rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(34,34,34,1);
	}
	.footer{
		margin: 30rpx;
		.footer-head{
			.footer-head-png{
				width: 30rpx;
				height: 38rpx;
				margin-right: 30rpx;
			}
			.footer-tip{
				font-size:30rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(10,10,10,1);
			}
		}
		.footer-container{
			margin-top: 40rpx;
			.footer-container-text{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(90,90,90,1);
			}
		}
	}
	.gray{
		height:27rpx;
		background:rgba(240,240,240,1);
		margin: 40rpx 0;
	}
	.handPaper-container{
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		border-top: 2rpx rgba(237,237,237,1) solid;
		border-bottom: 2rpx rgba(237,237,237,1) solid;
		margin:0 30rpx;
		padding: 20rpx;
		.allPaper{
			display: flex;
			flex-direction: row;
			.tip-png{
				width: 36rpx;
				height: 38rpx;
				margin-right: 10rpx;
				margin-top: 20rpx;
			}
		}
		.tip-right{
			
			.tip-right-text{
				font-size:16rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(174,174,174,1);
			}
			.tip-right-total{
				display: block;
				font-size:20rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(10,10,10,1);
			}
		}
		.line{
			width:2rpx;
			height:50rpx;
			background:rgba(237,237,237,1);
			margin: auto 0;
		}
		
	}
	.handPaper-header{
		margin: 65rpx auto;
		text-align: center;
		.circleClass{
			width: 272rpx;
			height: 272rpx;
			.u-progress-content {
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
		.handPaper-header-foot{
			height: 61rpx;
			color: #FFFFFF;
			margin: 56rpx auto;
			.lookAnswer{
				background-color: #1d2088;
				color: #fff;
				border-radius: 0;
			}
		}
	}
	
</style>
