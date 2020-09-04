<template>
	<view class="sun-question">
		<view class="demo" :style="'height:' + 260 + 'rpx;' + 'padding-top:' + demo.top + 'px;padding-bottom:10rpx'">
		   <view class="left" :style="'top:' + 20 + 'px'">
			   <view class="iconfont icon-xiaoxi">
						<image src="/static/my/back-left.png" @click="backToSuperior" class="back-btn" mode=""></image>	
						<view class="title">
							<view class="title-head">
								<text class="title-text">已添加题库</text>
							</view>
							<view class="title-footer">
								<text>(按住拖动调整顺序)</text>
							</view>
						</view>
				</view>
		   </view>
		</view>
		<view class="">
			<HM-dragSorts :list="diaCourse"  @clear-course="clearCourse" @confirm="dragConfirm"></HM-dragSorts>
		</view>
		<view class="container">
			<view class="container-head">
				<text class="tip">添加新题库</text>
			</view>
			<view v-for="(item,index) in courseList" :key="index" :index="index" class="list-btn">
				<button type="default" @click="changeSubCourse(index)" size="mini" class="subCourse-btn">{{item.name}}</button>
			</view>
			<view class="" style="height: 100rpx;"></view>
			<view class="container-footer">
				<button size="mini" type="default" class="saveClick" @click="saveClick">保存</button>
			</view>
		</view>
	</view>
</template>

<script>
    import dragSorts from '@/components/HM-dragSorts/HM-dragSorts.vue'

	export default{
		components: {
			'HM-dragSorts':dragSorts
		},
		data(){
			return{
				demo: {
				    top: 0,
				    height: 0
				},
				courseId:'',
				courseList:[],
				subCourse:'',
				diaCourse:[],
			}
		},
		methods:{
			//我是点击清空之后的值
			clearCourse:function(e){
				this.courseList.push({name:e.value.name,id:e.value.id})
				for(let i =0;i<this.diaCourse.length;i++){
					if(e.value.name ==this.diaCourse[i].name){
						this.diaCourse.splice(i,1)
					}
				}
				console.log(this.courseList,e,'我是e',this.diaCourse)
			},
			//调整顺序后，触发confirm事件，event = {list}
			dragConfirm:function(e){
				this.diaCourse = e.list
			},
			changeSubCourse:function(e){
				this.subCourse = this.courseList[e].name
				this.subCourseId= this.courseList[e].id
				this.diaCourse.push({name:this.subCourse,id:this.subCourseId})
				this.courseList.splice(e,1)
				console.log('为什么id会没有',this.diaCourse,this.courseList,'我是下拉')
			},
			saveClick:function(e){
				console.log(this.diaCourse,'明明有的啊，真是奇怪啊')
				this.$courses.courses = this.diaCourse
				uni.showToast({
					icon: 'none',
					title: '添加成功'
				});
				setTimeout(function(){
				uni.switchTab({
				    url: '/pages/questionBank/questionBank'
				})},1000)
				return
			},
			backToSuperior:function(e){
				uni.navigateBack({
				    delta: 1
				});
			}
		},
		onShow() {
			let userInfo = uni.getStorageSync('userInfo')
			this.diaCourse = this.$courses.courses
			console.log(this.diaCourse,'我是全局的值')
			let flag = false
			//拿到所有课程的值
			for(let i = 0;i<userInfo.courses.length;i++){
				if(this.courseId ==userInfo.courses[i].id){
					this.courseList= userInfo.courses[i].childrens
				}
			} 
			for(let i = 0;i<this.courseList.length;i++){
				if(this.diaCourse.length>0){
						if((this.courseList[i].name).indexOf(this.diaCourse[0].name) > -1){
							 flag = true
						}
					}
			}
			if(!flag){
				this.diaCourse = []
			}
			//判断上面课程是否有他的值
			for(let i = 0;i<this.courseList.length;i++){
				for(let j =0 ;j<this.diaCourse.length;j++){
					if(this.courseList[i].name ==this.diaCourse[j].name){
						this.courseList.splice(i,1)
					}
					
				}
			}
		},
		created(){
		    const demo = uni.getMenuButtonBoundingClientRect()
		    this.demo.top = demo.top
		    this.demo.height = demo.height
		},
		onLoad(option){
			this.courseId = option.courseId
			
			 
		}
	}
</script>

<style scoped lang="scss">
	.sun-question{
		.placeholder-ipt{
		   height: 80rpx;
		   width: 630rpx;
		   background-color: #FFFFFF;
		   border: 2rpx solid #FFFFFF;
		   border-radius: 20rpx;
		   display: flex;
		   flex-direction: row;
		   justify-content: space-between;
		   box-shadow:1px 1px 8px #333333;
		   -moz-box-shadow:1px 1px 8px #333333;
		   	-webkit-box-shadow:1px 1px 8px #333333; 
			margin: 0 auto;
		   .subCourse{
			   font-size:36rpx;
			   font-family:Microsoft YaHei;
			   font-weight:400;
			   color:rgba(48,48,48,1);
			   line-height:80rpx;
			   margin-left: 30rpx;
			   width: 480rpx;
			   overflow: hidden;
			   text-overflow:ellipsis;
			   white-space: nowrap;
		   }
		   .clear{
			   margin:27rpx;
			   .clear-img{
				  width: 35rpx;
				  height: 35rpx;
				}
		   }
		}
		.container{
			margin: 100rpx 0 0 30rpx;
			.container-head{
				font-size:36rpx;
				font-family:Microsoft YaHei;
				color:rgba(48,48,48,1);
				line-height:24rpx;
				margin-bottom: 40rpx;
				.tip{
					display: block;
					text-align: center;
				}
			}
			.list-btn{
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				margin-right: 15rpx;
				display: inline-block;
				margin-bottom: 40rpx;
				.subCourse-btn{
					border:2px solid rgba(221,226,234,1);
					border-radius:36rpx;
					background-color: #fff;
					color: #000000;
				}
			}
			.container-footer{
				.saveClick{
					width: 690rpx;
					height: 79rpx;
					background-color: #1d2088;
					color: #fff;
					position: fixed;
					bottom: 55rpx;
					line-height: 79rpx;
					border-radius: 45rpx;
					// margin-top: 85rpx;
				}
			}
		}
		.demo{
		       position: relative;
		       display: flex;
		       align-items: center;
		       justify-content: center;
				background-color: #1d2088;
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
					   display: flex;
					   .back-btn{
						   width: 20rpx;
						   height: 34rpx;
					   }
					   .title{
						   display: flex;
						   flex-direction: column;
						   margin-left: 240rpx;
						   .title-head{
								.title-text{
								   font-size:36rpx;
								   font-family:Microsoft YaHei;
								   color:rgba(255,255,255,1);
								   line-height:24rpx;
								}
							}
							.title-footer{
								font-size:30rpx;
								font-family:Microsoft YaHei;
								font-weight:400;
								color:rgba(255,255,255,1);
								line-height:24rpx;
								margin-left: -30rpx;
								margin-top:25rpx ;
							}
					   }
		           }
		       }
		   }
	}
</style>
