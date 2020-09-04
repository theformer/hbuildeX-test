<template>
	<!-- 成绩查询 -->
	<view class="score-inquiry">
		<!-- <movable-area scroll-x scroll-y> -->
			<view class="title">
				<text style="display: block;text-align: center;">
					2020年自考成绩查询
				</text>
			</view>
			<view class="">
				
			</view>
			<t-table  border-color="rgba(238,238,238,1);">
				<t-tr fontSize="20rpx" color="rgba(47,47,47,1)" align="center">
					<t-th>课程类型</t-th>
					<t-th>科目</t-th>
					<t-th>考试时间</t-th>
					<t-th>课程性质</t-th>
					<t-th>得分</t-th>
					<t-th>合格</t-th>
				</t-tr>
				<view v-for="(item,index) in newGrade" :key="item.id">
					<t-tr v-for="(itemSubcourse,itemIndex) in item.sublist" key="itemIndex.id">
						<t-td style="color: #1d2088 !important;background-color: #FFFFFF;">{{item.courseType}}</t-td>
						<t-td style="color: #1d2088 !important;background-color: #FFFFFF;">{{itemSubcourse.subCourseName}}</t-td>
						<t-td style="color: #1d2088 !important;background-color: #FFFFFF;">{{itemSubcourse.examTime}}</t-td>
						<t-td style="color: #1d2088 !important;background-color: #FFFFFF;">{{itemSubcourse.courseProperty}}</t-td>
						<t-td style="color: #1d2088 !important;background-color: #FFFFFF;">{{itemSubcourse.credit}}</t-td>
						<t-td style="color: #1d2088 !important;background-color: #FFFFFF;">{{itemSubcourse.passScore}}</t-td>
					</t-tr>
				</view>
					
				<!-- <t-tr v-for="(item,index) in newGrade" :key="item.id">
					<t-td>{{item.courseType}}</t-td>
					<t-td v-for="(itemSubcourse,itemIndex) in item.scoreOnlinelist" :key="itemIndex.id">{{itemSubcourse.subCourseName}}</t-td>
					
				</t-tr> -->
			</t-table>
		<!-- </movable-area> -->
		
	</view>
</template>

<script>
	 import tTable from '@/components/t-table/t-table.vue';
	    import tTh from '@/components/t-table/t-th.vue';
	    import tTr from '@/components/t-table/t-tr.vue';
	    import tTd from '@/components/t-table/t-td.vue';
	export default{
		 components: {
		            tTable,
		            tTh,
		            tTr,
		            tTd
		       },
		data(){
			return{
				newGrade:[]			,//最新成绩
				tkMsg:''
			}
		},
		onShow(){
			this.tkMsg = this.$store.state.userInfo.tkMsg
			uni.request({
				url: this.baseUrl + '/gxplatform/manager/gxscore/getStuScore',
				data: {
					 
				},
				method: "GET",
				header: {
					'content-type': 'application/x-www-form-urlencoded',
					'Cookie':'JSESSIONID='+this.tkMsg
				},
				success: (res) => {
					let list = JSON.parse(JSON.stringify(res.data.data))
					if (list ==null) { //res.data.data为空时请求数据失败
						return
					} else {
						// list.forEach((ele)=>{
						// 	ele.hoursBtime=ele.eTime.substring(5,10),
						// 	ele.minuteEtime=ele.bTime.substring(10,16)
						// 	ele.teacherName = ele.teacherName.substring(0,5)
						// })
						
						this.newGrade = list
					}
				},
			})
			
		},
		
	}
</script>

<style scoped lang="scss">
	.score-inquiry{
		.title{
			height:31rpx;
			font-size:30rpx;
			font-family:Microsoft YaHei;
			font-weight:bold;
			color:rgba(29,32,137,1);
			line-height:40rpx;
			margin: 50rpx auto;
		}
	}
	
	
</style>
