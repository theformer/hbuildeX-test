<template>
	<view class="schedule-details">
		<u-tabs :list="list" :is-scroll="false"  :current="current" @change="changeTabs" class="tabs"></u-tabs>
		<view class=""  v-show="current==0" >
			<view v-if="current==0" class="nullVal">
				<image src="../../static/组 7.png" class="dataNull"></image>
			</view>
			<view v-if="current==0" class="bottom-text">暂无数据</view>
		</view>
		<view class="" v-show="current==1">
			<u-collapse class="collapse-conteinar"   :arrow="arrow" :accordion="accordion">
				<u-collapse-item class="collapseName"  v-for="(itemVideo,indexVideo) in videoTeachList" :key="indexVideo" @change="collapseClick" :index="indexVideo">
					<template slot="title" style="background:rgba(244,247,252,1);">
						<view class="" style="display: flex;flex-direction: row; margin-left: 30rpx;">
							<image src="../../static/my/加.png" style="width: 26rpx;height: 26rpx;" mode="" v-if="!item.flag"></image>
							<image src="../../static/my/减.png" style="width: 26rpx;height: 26rpx;"  mode="" v-if="item.flag"></image>
							<view class="" style="width: 600rpx;margin-left: 30rpx;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
								<text class="title-sty">{{itemVideo.name}}</text>
							</view>
						</view>
					</template>
					<view class="footer" v-for="(itemChapterVideos,indexChapterVideos) in itemVideo.videoList" :key="indexChapterVideos">
							<view class="footer-subCourseName"  @click="linkToCourse(itemChapterVideos)">
								<text>{{itemChapterVideos.videoTitle}}</text>
							</view>
							<view class="footer-time">
								<view class="">
									已观看<text class="plain">{{itemChapterVideos.percent}}%</text>;
								</view>
								<view class="">
									<text class="min">{{itemChapterVideos.totalTime}}</text>分钟
								</view>
							</view>
					</view>
				</u-collapse-item>
			</u-collapse>
			<view v-if="videoTeachList.length==0" class="nullVal">
				<image src="../../static/组 7.png" class="dataNull"></image>
			</view>
			<view v-if="videoTeachList.length==0" class="bottom-text">暂无数据</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				arrow:false,		//是否显示标题右侧箭头
				accordion:true,		//是否以手风琴模式显示	
				current:1,
				list:[
					{name:'直播'},
					{name:'录播'}
				],
				subCourseId:'',
				livingTeachList:[],		//所有的直播科目
				videoTeachList:[]	,//所有的录播科目
				chapterVideos:[],		//录播存储的课程
				subName:''
			}
		},
		methods:{
			//跳转到录播课程
			linkToCourse:function(itemChapterVideos){
				setTimeout(function(){
					uni.navigateTo({
						url:'../live/recorded-videos?subCourse='+itemChapterVideos.id,
						animationType: 'pop-out',
					animationDuration: 200
					})},1000)
			},
			collapseClick:function(e){
				
			},
			changeTabs:function(index){
				this.current = index
			}
		},
		onLoad(option) {
			this.subCourseId = option.subCourseId
		},
		onShow() {
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/front/learning/getAllChapterVideosBySubCourseId',		//根据科目Id获取所有的录播视频
				data: {
					subCourseId:this.subCourseId
				},
				method: "POST",
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+this.tkMsg
				},
				success: (res) => {
					let list = JSON.parse(JSON.stringify(res.data.data))
					
					if (res.data.code==1) { //res.data.data为空时请求数据失败
						this.videoTeachList = list.chapterVideosList
						this.subName =res.data.data.subCourseName
						uni.setStorageSync('subName', this.subName);
						this.videoTeachList.forEach((ele)=>{
							ele.flag = false
							ele.videoList.forEach((e)=>{
								e.totalTime = e.totalTime.split(':'),
								e.totalTime =parseInt(e.totalTime[0])*60+parseInt(e.totalTime[1])+parseInt(e.totalTime[2]/60);
							})
						})
					} else {
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
	.schedule-details{
		// margin: 30rpx;
		.collapse-conteinar{
			.collapseName{
				display: block;
				background: rgba(244,247,252,1);
				margin: 5rpx;
				.title-sty{
					height:30rpx;
					font-size:30rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(50,51,55,1);
				}
			}
			.footer{
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				margin: 15rpx 15rpx;
				.footer-subCourseName{
					overflow: hidden;
					text-overflow:ellipsis;
					white-space: nowrap;
					width: 450rpx;
				}
				.footer-time{
					display: flex;
					flex-direction: row;
					.plain{
						color:#1D2089;
					}
					.min{
						color:#1D2089;
					}
				}
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
		.tabs{
			margin: 30rpx;
		}
	}
</style>
