<template>
	<view class="answer-sheet">
		<!-- 答题卡页面 -->
		<form>
				<view class="container" id="top-box">
					<!-- 左侧题目类型 -->
					<view class="text-black" v-if="paperId ||chapterId">
						<text class="tip" v-if="currentSelfType===1">单选题</text>
						<text class="tip" v-else-if="currentSelfType===2">判断题</text>
						<text class="tip" v-else-if="currentSelfType===3">多选题</text>
						<text class="tip" v-else-if="currentSelfType===4">简答题</text>
					</view>
					<view class="text-black" v-if="!paperId">
						<text class="tip" v-if="currentType===1">单选题</text>
						<text class="tip" v-else-if="currentType===2">多选题</text>
						<text class="tip" v-else-if="currentType===3">判断题</text>
						<text class="tip" v-else-if="currentType===4">不定项</text>
						<view class="tip" v-else-if="currentType===5">简答题</view>
					</view>
					<!-- 右侧当前题目的位置 -->
					<view class="container-right">
							<view>
								<text>{{questionIndex+1}}</text>/
								<text>{{total}}</text>
							</view>
					</view>
				</view>
				<!-- 题目轮播图 -->
				<swiper :indicator-dots="false" :autoplay="false" :current="questionIndex" @change="changeSwiper" :style="{'height':swiperHeight}">
					<swiper-item v-for="(item,index) in questionList" :key="index" class="swiper-item2">
						<!-- 题目 -->
						<view class="swiper-item">
							<view class="swiper-item-head">
								<view class="text-class" >{{item.questionTitle}}</view>
							</view>
						</view>
						<!-- 资格证-->
						<view v-if="!paperId&&!chapterId">
							<!-- 单选 -->
							<radio-group @change="radioboxChange"  v-if="item.questionTypeId ==1">
								<view class="answer-style">
									<radio class="radio-class"  value="A" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='A'" :disabled="activeDisabled" color="#1d2087" />
									<text class="choose-answer">A.</text>
									<view class="text-class" >{{item.a}}</view>
								</view>
								<view class="answer-style">
									<radio  class="radio-class" value="B" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='B'" :disabled="activeDisabled" color="#1d2087" />
									<text class="choose-answer">B.</text>
									<view class="text-class" >{{item.b}}</view>
								</view>
								<view class="answer-style">
									<radio  class="radio-class" value="C" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='C'" :disabled="activeDisabled" color="#1d2087"/>
									<text class="choose-answer">C.</text>
									<view class="text-class" >{{item.c}}</view>
								</view>
								<view class="answer-style" v-if="item.d!==''">
									<radio  class="radio-class" value="D" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='D'" :disabled="activeDisabled" color="#1d2087"/>
									<text class="choose-answer">D.</text>
									<view class="text-class" >{{item.d}}</view>
								</view>
							</radio-group>
							<!-- 多选 -->
							<checkbox-group    @change="checkboxChange" v-if="item.questionTypeId ==2">
								<view class="answer-style">
									<checkbox  class="radio-class checkbox" :checked="item.infoA" value="A"  :disabled="activeDisabled" color="#1d2087"/>
									<text class="choose-answer">A.</text>						
									<view class="text-class" >{{item.a}}</view>
								</view>
								<view class="answer-style">
									<checkbox class="radio-class checkbox"  :checked="item.infoB" value="B" :disabled="activeDisabled"  color="#1d2087"/>
									<text class="choose-answer">B.</text>
									<view class="text-class" >{{item.b}}</view>
								</view>
								<view class="answer-style">
									<checkbox class="radio-class checkbox"  :checked="item.infoC" value="C" :disabled="activeDisabled"  color="#1d2087"/>
									<text class="choose-answer">C.</text>
									<view class="text-class" >{{item.c}}</view>
								</view>
								<view class="answer-style" v-if="item.d!==''">
									<checkbox class="radio-class checkbox"  :checked="item.infoD" value="D" :disabled="activeDisabled"  color="#1d2087"/>
									<text class="choose-answer">D.</text>
									<view class="text-class" >{{item.d}}</view>
								</view>
							</checkbox-group>
							<!-- 判断 -->
							<radio-group @change="radioboxChange" v-if="item.questionTypeId ==3" >
								<view class="answer-style">
									<radio  class="radio-class" value="A" color="#1d2087" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='A'" :disabled="activeDisabled" />
									<text class="choose-answer">A.</text>
									<view class="text-class" >{{item.a}}</view>
								</view>
								<view class="answer-style">
									<radio  class="radio-class" value="B" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='B'" :disabled="activeDisabled" color="#1d2087"/>
									<text class="choose-answer">B.</text>
									<view class="text-class" >{{item.b}}</view>
								</view>
							</radio-group>
							<!-- 不定向 -->
							<checkbox-group    @change="checkboxChange" v-if="item.questionTypeId ==4">
								<view class="answer-style">
									<checkbox  class="radio-class checkbox" :checked="item.infoA" value="A" :disabled="activeDisabled" color="#1d2087"/>
									<text class="choose-answer">A.</text>						
									<view class="text-class" >{{item.a}}</view>
								</view>
								<view class="answer-style">
									<checkbox class="radio-class checkbox"  :checked="item.infoB" value="B" :disabled="activeDisabled"  color="#1d2087"/>
									<text class="choose-answer">B.</text>
									<view class="text-class" >{{item.b}}</view>
								</view>
								<view class="answer-style">
									<checkbox class="radio-class checkbox"  :checked="item.infoC" value="C" :disabled="activeDisabled"  color="#1d2087"/>
									<text class="choose-answer">C.</text>
									<view class="text-class" >{{item.c}}</view>
								</view>
								<view class="answer-style" v-if="item.d!==''">
									<checkbox class="radio-class checkbox"  :checked="item.infoD" value="D" :disabled="activeDisabled"  color="#1d2087"/>
									<text class="choose-answer">D.</text>
									<view class="text-class" >{{item.d}}</view>
								</view>
							</checkbox-group>
							<!-- 简答题 -->
							<view v-if="item.questionTypeId ==5">
								<!-- <rich-text :nodes="item.questionTitle"></rich-text> -->
								<textarea style="height:245rpx;"  v-if="!clear == true" class="textarea-style" @input="textBlurClick" :value="item.examObAnswer" type="textarea" maxlength="-1" :disabled="activeDisabled" :auto-height="true"></textarea>
							</view>
							<view v-show=" questionIndex+1 == total&& seeAnswer!=1">
								<button type="primary"  class="btn" @click="saveClick">保存</button>
							</view>
						</view>
						<!-- 自考 -->
						<view v-else>
							<radio-group @change="radioboxChange" v-if="item.questionTypeId ==1">
								<view class="answer-style">
									<radio class="radio-class"  value="A" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='A'" color="#1d2087" :disabled="activeDisabled"/>
									<text class="choose-answer">A.</text>
									<view class="text-class" >{{item.a}}</view>
								</view>
								<view class="answer-style">
									<radio  class="radio-class" value="B" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='B'" color="#1d2087" :disabled="activeDisabled"/>
									<text class="choose-answer">B.</text>
									<view class="text-class" >{{item.b}}</view>
								</view>
								<view class="answer-style">
									<radio  class="radio-class" value="C" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='C'" color="#1d2087" :disabled="activeDisabled"/>
									<text class="choose-answer">C.</text>
									<view class="text-class" >{{item.c}}</view>
								</view>
								<view class="answer-style" v-if="item.d!==''">
									<radio  class="radio-class" value="D" :checked="item.examObAnswer!=undefined&&item.examObAnswer=='D'" color="#1d2087" :disabled="activeDisabled"/>
									<text class="choose-answer">D.</text>
									<view class="text-class" >{{item.d}}</view>
								</view>
								
							</radio-group>
							
							<!-- 多选 -->
						<checkbox-group    @change="checkboxChange" v-if="item.questionTypeId ==3">
							<view class="answer-style">
								<checkbox  class="radio-class checkbox" :checked="item.infoA" value="A" :disabled="activeDisabled"  color="#1d2087"/>
								<text class="choose-answer">A.</text>						
								<view class="text-class" >{{item.a}}</view>
							</view>
							<view class="answer-style">
								<checkbox class="radio-class checkbox"  :checked="item.infoB" value="B" :disabled="activeDisabled"  color="#1d2087"/>
								<text class="choose-answer">B.</text>
								<view class="text-class" >{{item.b}}</view>
							</view>
							<view class="answer-style">
								<checkbox class="radio-class checkbox"  :checked="item.infoC" value="C" :disabled="activeDisabled"  color="#1d2087"/>
								<text class="choose-answer">C.</text>
								<view class="text-class" >{{item.c}}</view>
							</view>
							<view class="answer-style" v-if="item.d!==''">
								<checkbox class="radio-class checkbox"  :checked="item.infoD" value="D" :disabled="activeDisabled"  color="#1d2087"/>
								<text class="choose-answer">D.</text>
								<view class="text-class" >{{item.d}}</view>
							</view>
						</checkbox-group>
							<!-- 判断 -->
							<radio-group @change="radioboxChange" v-if="item.questionTypeId ==2">
								<view class="answer-style">
									<radio  class="radio-class" value="A"  :checked="item.examObAnswer!=undefined&&item.examObAnswer=='A'" color="#1d2087" :disabled="activeDisabled"/>
									<text class="choose-answer">A.</text>
										<view class="text-class" >{{item.a}}</view>
								</view>
								<view class="answer-style">
									<radio  class="radio-class" value="B"  :checked="item.examObAnswer!=undefined&&item.examObAnswer=='B'" color="#1d2087" :disabled="activeDisabled"/>
									<text class="choose-answer">B.</text>
									<view class="text-class" >{{item.b}}</view>
								</view>
							</radio-group>
							<!-- 简答题 -->
							<view v-if="item.questionTypeId ==4" style="margin: 20rpx auto;">
								<textarea style="height:245rpx;" v-if="!clear == true" class="textarea-style" @input="textBlurClick" :value="item.examObAnswer" type="textarea" maxlength="-1" :disabled="activeDisabled" :auto-height="true"></textarea>
							</view>
							<view v-if=" questionIndex+1 == total&& isShow !='1'">
								<button type="primary"  class="btn" @click="saveClick">保存</button>
							</view>
						</view>
						<!-- 正确答案 -->
						<view  class="margin-top" v-show="!seeOK||isShowOk" style="margin-top: 32rpx;">
							<view class="cu-bar">
								<view class="action  text-grey" v-if="">
									<text>参考答案：</text>
									<text class="text-violet">{{item.obAnswer}}</text>
								</view>
								<view class="action  text-grey" v-if="item.examObAnswer!=undefined">
									<text>我的选择：</text>
									<text class="text-red" v-cloak>{{item.examObAnswer||'未作答'}}</text>
								</view>
							</view>
							<view class="cu-bar-title">
								<view class="action  text-grey">
									<image src="/static/questionBank/analysis.png" class="answer-png"></image>
								</view>
							</view>
							<view class="text-content padding  text-grey">
								<text class="answer-text">答案解析</text>
								<text >{{item.analyzeWord||item.subAnswer}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
		</form>
		<!-- 底部操作 交卷 纠错 答题卡 -->
		<view class="footer" id="foot-box">
			<view class="tabbar-style" v-if="seeOK||!isShowOk" @click="saveClick">
				<image src="/static/questionBank/handPaper.png" class="footer-png"></image>
				<text class="footer-text">交卷</text>
			</view>
			<view class="tabbar-style" v-if="isShow==1" @click="clearClick">
				<image src="/static/questionBank/giveUp.png" class="footer-png"></image>
				<text class="footer-text">移除</text>
			</view>
			<view class="tabbar-style" @click="finishClick">
				<image src="/static/questionBank/correct.png" class="footer-png"></image>
				<text class="footer-text">纠错</text>
			</view>	
			<view class="tabbar-style-right" @click="answerSheetClick">
				<image src="/static/questionBank/answerSheet.png" class="footer-png-right"></image>
				<text class="footer-text">答题卡</text>
			</view>
		</view>
		<!-- 答题卡 -->
		<view v-if="!modalShow&&answerSheet">
			<u-popup v-model="answerSheet" class="popup" mode="bottom">
				<view class="popup-head">
					答题卡
				</view>
				<!-- 资格证 -->
				<view v-if="!paperId&&!chapterId">
					<view v-if="multipleChoice.length!==0">
						<view class="single-choice">单选题</view>
							<view class="text-center">
								<view class="margin-tb-sm" v-for="(item,indexMultiple) in questionList" :key="indexMultiple">
									<button v-if="item.questionTypeId==1" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexMultiple)" >
										{{indexMultiple+1}}
									</button>
								</view>
							</view>
					</view> 
					 <view v-if="multiSelect.length!==0">
					 	<view class="single-choice">多选题</view>
					 		<view class="text-center">
					 			<view class="margin-tb-sm" v-for="(item,indexMulti) in questionList" :key="indexMulti">
					 				<button v-if="item.questionTypeId==2" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexMulti)" >{{indexMulti+1}}</button>
					 			</view>
					 		</view>
					 </view>
					 <view v-if="judge.length!==0">
					 	<view class="single-choice">判断题</view>
					 	<view class="margin-tb-sm text-center">
					 		<view class="margin-tb-sm" v-for="(item,indexjudge) in questionList" :key="indexjudge">
					 			<button v-if="item.questionTypeId==3" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexjudge)" >{{indexjudge+1}}</button>
					 		</view>
					 	</view>
					 </view>
					 <view v-if="nonDirectional.length!==0">
					 	<view class="single-choice">不定项</view>
					 	<view class="margin-tb-sm text-center">
					 		<view class="margin-tb-sm" v-for="(item,indexnon) in questionList" :key="indexnon" >
					 			<button v-if="item.questionTypeId==4" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexnon)" >{{indexnon+1}}</button>
					 		</view>
					 	</view>
					 </view>
					<view v-if="shortAnswer.length!==0">
						<view class="single-choice">简答题</view>
						<view class="margin-tb-sm text-center">
							<view class="margin-tb-sm" v-for="(item,indexShort) in questionList" :key="indexShort">
								<button v-if="item.questionTypeId==5" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexShort)" >{{indexShort+1}}</button>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<view v-if="multipleChoice.length!==0">
						<view class="single-choice">单选题</view>
							<view class="text-center">
								<view class="margin-tb-sm" v-for="(item,indexMultiple) in questionList" :key="indexMultiple">
									<button v-if="item.questionTypeId==1" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexMultiple)" >
										{{indexMultiple+1}}
									</button>
								</view>
							</view>
					</view> 
					 <view v-if="judge.length!==0">
						<view class="single-choice">判断题</view>
					 		<view class="text-center">
								<view class="margin-tb-sm" v-for="(item,indexjudge) in questionList" :key="indexjudge">
									<button v-if="item.questionTypeId==2" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexjudge)" >{{indexjudge+1}}</button>
								</view>
					 		</view>
					 </view>
					 <view v-if="multiSelect.length!==0">
						<view class="single-choice">多选题</view>
						<view class="margin-tb-sm text-center">
							<view class="margin-tb-sm" v-for="(item,indexMulti) in questionList" :key="indexMulti">
								<button v-if="item.questionTypeId==3" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexMulti)" >{{indexMulti+1}}</button>
							</view>
						</view>
					 </view>
					<view v-if="shortAnswer.length!==0">
						<view class="single-choice">简答题</view>
						<view class="margin-tb-sm text-center">
							<view class="margin-tb-sm" v-for="(item,indexShort) in questionList" :key="indexShort">
								<button v-if="item.questionTypeId==4" class="cu-btn round btnStyle" size="mini" :class="[item.userAnswer.length===0?'line-grey':'bg-haveFinashed']" @click="appointedQuestion(indexShort)" >{{indexShort+1}}</button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<!-- 提交弹框 -->
		<u-modal 
			class="modal-style"
			v-model="modalShow" 
			:mask-close-able="false" 
			:show-title="false"
			:show-confirm-button="false"
			:show-cancel-button="false"
			width="464rpx"
			>
			<view class="modal">
				<view class="modal-head">
					<image class="modal-png" src="/static/questionBank/finished.png"></image>
				</view>
				<view class="modal-container">
					<view class="modal-container-text">
						试卷全部做完才能交卷哦！
					</view>
				</view>
				<view class="modal-footer">
					<button type="default" size="mini" class="quitClick" @click="cancelModal">退出</button>
					<button  type="default" size="mini" class="goOnClick" @click="clickModal">继续做题</button>
				</view>
			</view>
			
			
		</u-modal>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				// topiclist:'',
				currentType:0, //题目类型
				currentSelfType:0,//自考题目类型
				questionIndex:0,
				questionList:[],//题目
				multipleChoice:[],//单选
				judge:[]		,//判断
				multiSelect:[],	//多选
				shortAnswer:[],	//简答
				nonDirectional:[],	//不定向题目
				swiperHeight:"1500px",//轮播图的高度
				activeDisabled:false,//交卷后选项的状态
				answerSheet:false,
				totalpoints:0, 		//当前分数
				rightQuestionNumber:0,//题目正确的数量
				totalQuestionNumber:0,//总题目数
				mistakeQuestionNumber:0,//题目错误的数量
				modalShow:false,		//点击交卷时跳出提示
				// content:'还有 '+this.totalQuestionNumber+'未做,是否确认提交？' ,//提交时提示还有多少题没做
				modalCard:null,//显示答题卡
				dataList:[],
				subCourseId:'',		//需要的试卷Id
				total:'',			//顶部总数
				questionJson:[],		//交卷传的学生答案
				tkMsg:'',
				type:'',				//交卷时type为1每日一练，2章节练习，3章节测试
				ids:[],					//用户反馈时ids为题目集合
				itemId:'',				//当前题目Id
				isShow:'',				//是否显示答案解析
				questionLibIds:[],
				seeAnswer:'',
				current:'',				//是否被选中
				analysis:[]				,//得分页面调用接口存储已选答案
				seeOK:true,
				isShowOk:false,
				clear:false, 
				paperId:''				,//阶段测试试卷id
				chapterId:''			,//章节Id 判断是否从单项练习页面进来
			}
		},
		//轮播图高度和手机一样
		onReady() {
			var tempHeight = 1500;
			var _me = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {
					tempHeight = res.windowHeight;
					uni.createSelectorQuery().select("#top-box").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						tempHeight -= data.height;
						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							//swiper高度自适应
							_me.getElementHeight('.swiper-item2')
						}).exec();
			
					}).exec();
				}
			});
		
		},
		methods:{
			 getElementHeight(element) {
			     setTimeout(()=>{
			         let query = uni.createSelectorQuery().in(this);
			         query.select(element).boundingClientRect();
			         query.exec((res) => {
			             if (!res) {//如果没获取到，再调一次
			                 this.getElementHeight();
			             }else {
			                 this.swiperHeight = res[0].height+'px';
							 console.log(this.swiperHeight,res,'好家伙啊')
			             }
			         })
			     },20)
			 },
			//用户反馈查看得分
			finishClick:function(e){
				this.itemId = this.ids[this.questionIndex]
				uni.navigateTo({
					url:'user-feedback?type='+1+'&itemId='+this.itemId,
					animationType: 'pop-in',
					animationDuration: 300
				})
			},
			//点击取消时触发
			cancelModal:function(e){
				this.modalShow = false
				uni.navigateBack({
				    delta: 1,
				    animationType: 'pop-out',
				    animationDuration: 200
				});
			},
			//点击确认按钮时触发
			clickModal:function(e){
				this.modalShow = false
			},
			//移除逻辑
			clearClick:function(e){
				this.ids = JSON.stringify(this.ids);
				this.ids = this.ids.replace("[", "");
				this.ids = this.ids.replace("]", "");
				this.ids = this.ids.replace(/},{/g, "}<gx>{");
				uni.request({
					url: this.baseUrl + '/gxplatform/tk/wrongreview/delWrongReview',
					data:{
						questionLibIds:this.ids,
						subCourseId:this.subCourseId
					},
					method:"POST",
					header: {
						'content-type': 'application/x-www-form-urlencoded',
						'Cookie':'JSESSIONID='+this.tkMsg
					},
					success: (res) => {
						if (res.data.code ==1) { //res.data.data为空时请求数据失败
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});		
							setTimeout(function(){
								uni.navigateBack({delta:1,
								animationType: 'pop-out',
								animationDuration: 200
							})},2000)
							return
						} else {
							uni.showToast({
								icon: 'none',
								title: res.data.message
							});
						}
					},
				})
			},
			//交卷逻辑
			saveClick:function(e){
				if(this.questionList.findIndex((n)=>{return n.userAnswer ==''}) ==-1){
					if(!this.paperId&&!this.chapterId){
						for(let i = 0;i<this.questionList.length;i++){
							if(this.questionList[i].questionTypeId == 1||this.questionList[i].questionTypeId == 3){
								this.dataList.push({
									id:this.questionList[i].id,
									obAnswer:this.questionList[i].userAnswer,
									subAnswer:''
								})
							}else if(this.questionList[i].questionTypeId == 5){
								this.dataList.push({
									id:this.questionList[i].id,
									obAnswer:'',
									subAnswer:this.questionList[i].userAnswer
								})
							}else{
								this.dataList.push({
									id:this.questionList[i].id,
									obAnswer:this.questionList[i].userAnswer,
									subAnswer:''
								})
							}
						}
					}else{
						for(let i = 0;i<this.questionList.length;i++){
							if(this.questionList[i].questionTypeId == 1||this.questionList[i].questionTypeId == 2||this.questionList[i].questionTypeId == 3){
								this.dataList.push({
									id:this.questionList[i].id,
									obAnswer:this.questionList[i].userAnswer,
									subAnswer:''
								})
							}else{
								this.dataList.push({
									id:this.questionList[i].id,
									obAnswer:'',
									subAnswer:this.questionList[i].userAnswer
								})
							}
						}
					}
				
					this.questionJson = JSON.stringify(this.dataList);
					this.questionJson=this.questionJson.substr(0,this.questionJson.length-1);
					this.questionJson=this.questionJson.substr(1,this.questionJson.length-1);
					this.questionJson = this.questionJson.replace(/},{/g, "}<gx>{");
					//自考模式下
					if(this.paperId||this.chapterId){
						uni.request({
							url: this.baseUrl + '/gxplatform/tk/examination/saveExamResult',
							data:{
								questionJson:this.questionJson,
								paperId:this.chapterId||this.paperId,
								subCourseId:this.subCourseId
							},
							method:"POST",
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
									uni.setStorageSync('question',this.questionJson)
									uni.setStorageSync('handPaper', list);
									uni.navigateTo({
										url: 'handPaper?subCourseId='+this.subCourseId+'&type='+this.type+'&paperId='+this.paperId,
										animationType: 'pop-in',
										animationDuration: 300
									})
								}
							},
						})
					}else{
							uni.request({
							url: this.baseUrl + '/gxplatform/front/tk/handPaper',
							data:{
								questionJson:this.questionJson,
								type:this.type,
								subCourseId:this.subCourseId
							},
							method:"POST",
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
									uni.setStorageSync('question',this.questionJson)
									uni.setStorageSync('handPaper', list);
									uni.navigateTo({
										url: 'handPaper?subCourseId='+this.subCourseId+'&type='+this.type,
										animationType: 'pop-in',
										animationDuration: 300
									})
								}
							},
						})
					}
					
				}else{
					this.modalShow = true
				}
				
			},
			//题卡指定
			appointedQuestion: function(e) { 
				this.modalCard = null;		//显示答题卡
				this.questionIndex = e;		//跳转索引		
				this.answerSheet = false
			},
			//答题卡弹框
			answerSheetClick:function(e){
				this.answerSheet = true
				this.modalCard = e.currentTarget.dataset.target
			},
			//滑动事件
			changeSwiper: function(e) { 
				let index = e.target.current;
				if (index != undefined) {
					this.questionIndex = index;
					if(this.paperId||this.chapterId){
						this.currentSelfType =  this.questionList[index].questionTypeId
					}else{
						this.currentType = this.questionList[index].questionTypeId;
					}
				}
			},
			//复选选中
			checkboxChange: function(e) { 
				// var items = this.questionList[this.questionIndex].optionList;
				var values = e.detail.value;			//拿到复选框的值
				this.questionList[this.questionIndex].userAnswer =values
				
				if(values !== null){
					if(this.questionIndex === this.questionIndex){
						this.totalQuestionNumber = this.totalQuestionNumber - 1;
					}else{
						this.totalQuestionNumber = this.totalQuestionNumber;
					}
				}
			},
			//单选选中
			radioboxChange : function(e) { 
				var values = e.detail.value;//e.detail.value 用户的选择的选项
				this.questionList[this.questionIndex].userAnswer = values;	//已经选择做完题了的标识
				if(this.questionIndex < this.questionList.length - 1){		//判断是否自动跳转到下一题
					this.questionIndex += 1;
				};
				//如果选择了有值总题目数就少1
				if(values !== null){
					if(this.questionIndex == this.questionIndex){
						this.totalQuestionNumber = this.totalQuestionNumber - 1;
					}else{
						this.totalQuestionNumber = this.totalQuestionNumber;
					}	
				}
			},
			//简答题失去焦点判断是否已经做答
			textBlurClick:function(e){
				var values = e.detail.value;//e.detail.value 用户的选择的选项
				this.questionList[this.questionIndex].userAnswer = values;
				if(values !==null){
					if(this.questionIndex == this.questionIndex){
						this.totalQuestionNumber = this.totalQuestionNumber - 1;
					}else{
					this.totalQuestionNumber = this.totalQuestionNumber
					}
				}
			}
		},
		onShow() {
			//自考情况下
			this.tkMsg = this.$store.state.userInfo.tkMsg
			if(this.paperId||this.chapterId){
				if(this.paperId&&!this.chapterId){
					uni.request({
							url: this.baseUrl + '/gxplatform/tk/examination/getJDQuestionListByPaperId',
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
									// uni.showToast({
									// 	icon: 'none',
									// 	title: res.data.message
									// });
									return
								} else {
									this.questionList = list.questionList
									for(let i = 0;i<this.questionList.length;i++){
											this.questionList[i].userAnswer =''
											if(this.questionList[i].a!=''&&this.questionList[i].a!=undefined){
												this.questionList[i].a = this.questionList[i].a.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].b!=''&&this.questionList[i].b!=undefined){
												this.questionList[i].b = this.questionList[i].b.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].c!=''&&this.questionList[i].c!=undefined){
												this.questionList[i].c = this.questionList[i].c.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].d!=''&&this.questionList[i].d!=undefined){
												this.questionList[i].d = this.questionList[i].d.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].e!=''&&this.questionList[i].e!=undefined){
												this.questionList[i].e = this.questionList[i].e.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].f!=''&&this.questionList[i].f!=undefined){
												this.questionList[i].f = this.questionList[i].f.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].g!=''&&this.questionList[i].g!=undefined){
												this.questionList[i].g= this.questionList[i].g.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].questionTitle!=''){
												this.questionList[i].questionTitle = this.questionList[i].questionTitle.replace(/<[^>]+>|&[^>]+;/g, '')
											}
											if(this.questionList[i].analyzeWord!=''&&this.questionList[i].analyzeWord!=undefined){
												this.questionList[i].analyzeWord =this.questionList[i].analyzeWord.replace(/<[^>]+>|&[^>]+;/g, '')
											}
									}
									this.total = this.questionList.length				//挂载上右侧的总题目数
									this.totalQuestionNumber = this.questionList.length	//是否能点击交卷按钮
									this.currentSelfType = this.questionList[0].questionTypeId;
									for(let i = 0;i<this.questionList.length;i++){
											 this.ids.push(this.questionList[i].id)		//1单选2判断3多选4简答
										//单选
										 if(this.questionList[i].questionTypeId ==1){			/* 单选 */
											 this.multipleChoice.push({
												 questionTitle:this.questionList[i].questionTitle,
											 })
										 }else if(this.questionList[i].questionTypeId ==2){		/* 判断 */
											 this.judge.push({
												 questionTitle:this.questionList[i].questionTitle,
											 })
										 }else if(this.questionList[i].questionTypeId ==4){		/* 简答 */
											 this.shortAnswer.push({
												 questionTitle:this.questionList[i].questionTitle,
												 
											 })
										 }else {												/* 多选 */
											 this.multiSelect.push({
											 	questionTitle:this.questionList[i].questionTitle,
											 })
										 }
									}
									if(this.analysis.length>0){
										this.questionList = this.questionList.map((item,index)=>{
											return{...item,...this.analysis[index]}
										})
										for(let i = 0;i<this.questionList.length;i++){
											this.questionList[i].userAnswer =this.questionList[i].examObAnswer
											this.questionList[i].infoA = false
											this.questionList[i].infoB = false
											this.questionList[i].infoC = false
											this.questionList[i].infoD = false
											this.questionList[i].infoE = false
											if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('A')>-1){
												this.questionList[i].infoA = true
											}
											if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('B')>-1){
												this.questionList[i].infoB = true
											}
											if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('C')>-1){
												this.questionList[i].infoC = true
											}
											if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('D')>-1){
												this.questionList[i].infoD = true
											}
											if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('E')>-1){
												this.questionList[i].infoE = true
											}
											if(this.questionList[i].examObAnswer!=undefined){
												this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('[','')
												this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace(']','')
												if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("A")>-1){
													this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"A"','A')
												}
												if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("B")>-1){
													this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"B"','B')
												}
												if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("C")>-1){
													this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"C"','C')
												}
												if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("D")>-1){
													this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"D"','D')
												}
											}
										
										}
									}
								}
							},
					})
				}else{
					this.questionList = uni.getStorageSync('topiclist')
					for(let i = 0;i<this.questionList.length;i++){
							this.questionList[i].userAnswer =''
							if(this.questionList[i].a!=''&&this.questionList[i].a!=undefined){
								this.questionList[i].a = this.questionList[i].a.replace(/<[^>]+>|&[^>]+;/g, '')
							}
							if(this.questionList[i].b!=''&&this.questionList[i].b!=undefined){
								this.questionList[i].b = this.questionList[i].b.replace(/<[^>]+>|&[^>]+;/g, '')
							}
							if(this.questionList[i].c!=''&&this.questionList[i].c!=undefined){
								this.questionList[i].c = this.questionList[i].c.replace(/<[^>]+>|&[^>]+;/g, '')
								}
							if(this.questionList[i].d!=''&&this.questionList[i].d!=undefined){
								this.questionList[i].d = this.questionList[i].d.replace(/<[^>]+>|&[^>]+;/g, '')
							}
							if(this.questionList[i].e!=''&&this.questionList[i].e!=undefined){
								this.questionList[i].e = this.questionList[i].e.replace(/<[^>]+>|&[^>]+;/g, '')
							}
							if(this.questionList[i].f!=''&&this.questionList[i].f!=undefined){
								this.questionList[i].f = this.questionList[i].f.replace(/<[^>]+>|&[^>]+;/g, '')
							}
							if(this.questionList[i].g!=''&&this.questionList[i].g!=undefined){
								this.questionList[i].g= this.questionList[i].g.replace(/<[^>]+>|&[^>]+;/g, '')
							}
							if(this.questionList[i].questionTitle!=''){
								this.questionList[i].questionTitle = this.questionList[i].questionTitle.replace(/<[^>]+>|&[^>]+;/g, '')
							}
							if(this.questionList[i].analyzeWord!=''&&this.questionList[i].analyzeWord!=undefined){
								this.questionList[i].analyzeWord =this.questionList[i].analyzeWord.replace(/<[^>]+>|&[^>]+;/g, '')
							}
					}
					this.total = this.questionList.length				//挂载上右侧的总题目数
					this.totalQuestionNumber = this.questionList.length	//是否能点击交卷按钮
					this.currentSelfType = this.questionList[0].questionTypeId;
					for(let i = 0;i<this.questionList.length;i++){
							 this.ids.push(this.questionList[i].id)		//1单选2判断3多选4简答
						//单选
						 if(this.questionList[i].questionTypeId ==1){			/* 单选 */
							 this.multipleChoice.push({
								 questionTitle:this.questionList[i].questionTitle,
							 })
						 }else if(this.questionList[i].questionTypeId ==2){		/* 判断 */
							 this.judge.push({
								 questionTitle:this.questionList[i].questionTitle,
							 })
						 }else if(this.questionList[i].questionTypeId ==4){		/* 简答 */
							 this.shortAnswer.push({
								 questionTitle:this.questionList[i].questionTitle,
								 
							 })
						 }else {												/* 多选 */
							 this.multiSelect.push({
							 	questionTitle:this.questionList[i].questionTitle,
							 })
						 }
					}

					if(this.analysis.length>0){
						this.questionList = this.questionList.map((item,index)=>{
							return{...item,...this.analysis[index]}
						})
						for(let i = 0;i<this.questionList.length;i++){
							this.questionList[i].userAnswer =this.questionList[i].examObAnswer
							this.questionList[i].infoA = false
							this.questionList[i].infoB = false
							this.questionList[i].infoC = false
							this.questionList[i].infoD = false
							this.questionList[i].infoE = false
							if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('A')>-1){
								this.questionList[i].infoA = true
							}
							if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('B')>-1){
								this.questionList[i].infoB = true
							}
							if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('C')>-1){
								this.questionList[i].infoC = true
							}
							if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('D')>-1){
								this.questionList[i].infoD = true
							}
							if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('E')>-1){
								this.questionList[i].infoE = true
							}
							console.log(this.questionList[i].examObAnswer,'我就问为地方会报错')
							if(this.questionList[i].examObAnswer!=undefined){
								this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('[','')
								this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace(']','')
								if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("A")>-1){
									this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"A"','A')
								}
								if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("B")>-1){
									this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"B"','B')
								}
								if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("C")>-1){
									this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"C"','C')
								}
								if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("D")>-1){
									this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"D"','D')
								}
							}
						}
					}
				}
				
			}else{
			//从缓存中拿取题目信息
			this.questionList = uni.getStorageSync('topiclist')
			for(let i = 0;i<this.questionList.length;i++){
					this.questionList[i].userAnswer =''
					if(this.questionList[i].a!=''&&this.questionList[i].a!=undefined){
						this.questionList[i].a = this.questionList[i].a.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].b!=''&&this.questionList[i].b!=undefined){
						this.questionList[i].b = this.questionList[i].b.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].c!=''&&this.questionList[i].c!=undefined){
						this.questionList[i].c = this.questionList[i].c.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].d!=''&&this.questionList[i].d!=undefined){
						this.questionList[i].d = this.questionList[i].d.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].e!=''&&this.questionList[i].e!=undefined){
						this.questionList[i].e = this.questionList[i].e.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].f!=''&&this.questionList[i].f!=undefined){
						this.questionList[i].f = this.questionList[i].f.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].g!=''&&this.questionList[i].g!=undefined){
						this.questionList[i].g= this.questionList[i].g.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].questionTitle!=''&&this.questionList[i].questionTitle!=undefined){
						this.questionList[i].questionTitle = this.questionList[i].questionTitle.replace(/<[^>]+>|&[^>]+;/g, '')
					}
					if(this.questionList[i].analyzeWord!=''&&this.questionList[i].analyzeWord!=undefined){
						this.questionList[i].analyzeWord =this.questionList[i].analyzeWord.replace(/<[^>]+>|&[^>]+;/g, '')
					}
			}
			this.total = this.questionList.length				//挂载上右侧的总题目数
			this.totalQuestionNumber = this.questionList.length	//是否能点击交卷按钮
			this.currentType = this.questionList[0].questionTypeId;
			for(let i = 0;i<this.questionList.length;i++){
					 this.ids.push(this.questionList[i].id)
				//单选
				 if(this.questionList[i].questionTypeId ==1){			/* 单选 */
					 this.multipleChoice.push({
						 questionTitle:this.questionList[i].questionTitle,
					 })
				 }else if(this.questionList[i].questionTypeId ==2){		/* 多选 */
					 this.multiSelect.push({
						 questionTitle:this.questionList[i].questionTitle,
					 })
				 }else if(this.questionList[i].questionTypeId ==5){		/* 简答 */
					 this.shortAnswer.push({
						 questionTitle:this.questionList[i].questionTitle,
						 
					 })
				 }else if(this.questionList[i].questionTypeId ==3){		/* 判断题 */
					 this.judge.push({
					 	questionTitle:this.questionList[i].questionTitle,
					 })
				 }else{
					 this.nonDirectional.push({							/* 不定向 */
						 questionTitle:this.questionList[i].questionTitle,
					 })
				 }
			}
				if(this.analysis.length>0){
					this.questionList = this.questionList.map((item,index)=>{
						return{...item,...this.analysis[index]}
					})
					for(let i = 0;i<this.questionList.length;i++){
						this.questionList[i].userAnswer =this.questionList[i].examObAnswer
						this.questionList[i].infoA = false
						this.questionList[i].infoB = false
						this.questionList[i].infoC = false
						this.questionList[i].infoD = false
						this.questionList[i].infoE = false
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('A')>-1){
							this.questionList[i].infoA = true
						}
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('B')>-1){
							this.questionList[i].infoB = true
						}
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('C')>-1){
							this.questionList[i].infoC = true
						}
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('D')>-1){
							this.questionList[i].infoD = true
						}
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf('E')>-1){
							this.questionList[i].infoE = true
						}
						if(this.questionList[i].examObAnswer!=undefined){
						this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('[','')
						this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace(']','')
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("A")>-1){
							this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"A"','A')
						}
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("B")>-1){
							this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"B"','B')
						}
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("C")>-1){
							this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"C"','C')
						}
						if(this.questionList[i].examObAnswer!=undefined&&this.questionList[i].examObAnswer.indexOf("D")>-1){
							this.questionList[i].examObAnswer =this.questionList[i].examObAnswer.replace('"D"','D')
						}
						}
						
					}	
				}
			}
		
		},
		onLoad:function(option){
			this.subCourseId = option.subCourseId
			this.type = option.type
			this.seeAnswer = option.seeAnswer
			this.isShow = option.isShow
			this.paperId = option.paperId			//阶段测试试卷id
			this.chapterId = option.chapterId
			console.log(option,'我是值')
			//isShow是从错题页面进来的，判断是否要显示底部tabber 1是从错题本进来 0是从别的方式进来 seeAnswer1是从得分页面
			if(this.isShow ==1){
				this.isShowOk =true
				this.seeOK = false
				this.activeDisabled = true
				this.clear = true
			}
			if(this.seeAnswer ==1 ){
				this.activeDisabled = true
				this.seeOK = false
				this.isShowOk = true
				this.isShow = 1
				this.clear = true
				if(option.paperIds =='undefined'){
					option.paperIds = ''
				}
				this.paperId  = option.paperIds
				this.analysis = uni.getStorageSync('analysis')
				
			}
		}
	}

</script>

<style scoped lang="scss">
	.modal-style{
		.modal{
			width: 464rpx;
			.modal-head{
				.modal-png{
					width: 464rpx;
					height: 249rpx;
				}
			}
			.modal-container{
				text-align: center;
				.modal-container-text{
					height:24rpx;
					font-size:24rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(34,34,34,1);
					line-height:38rpx;
					margin: 73rpx 0 ;
				}
			}
			.modal-footer{
				display: flex;
				margin-bottom: 20rpx;
				.quitClick{
					width: 184rpx;
					height: 55rpx;
					background-color: #a9acb0;
					color: #FFFFFF;
					
				}
				.goOnClick{
					width: 184rpx;
					height: 55rpx;
					background-color: #1d2088;
					color: #FFFFFF;
				}
			}
		}
	}
	

	.choose-answer{
		margin-right: 10rpx;
	}
	.popup{
		margin: 50rpx 30rpx;
	}
	.single-choice{
		font-size:30rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(0,0,0,1);
		margin: 0 30rpx;
	}
	.popup-head{
		font-size:36rpx;
		font-family:Microsoft YaHei;
		font-weight:bold;
		color:rgba(0,0,0,1);
		margin: 50rpx 30rpx;
		
	}
	.text-center{
		display: flex;
		flex-direction:row;
		flex-wrap: wrap;
	}
	.btnStyle{
		width:74rpx;
		height:74rpx;
		background:rgba(238,238,238,1);
		border-radius:50%;
		margin: 15rpx 25rpx;
		text-align: center;
		line-height: 74rpx;
		padding-left:30rpx
	}
	.bg-haveFinashed{
		background-color:  #1d2088;
		color: #fff;
	}
	.line-grey{
		background-color: #ececed;
		color: #9e9e9e;
		
	}
	.btn{
		width: 80%;
		background:rgba(29,32,137,1);
		border-radius:45px;
		margin-top: 150rpx;
	}
	.textarea-style{
		width: 648rpx;
		height: 245rpx !important;
		// margin: 20rpx auto;
		border: thin dotted #333333;
		padding: 10rpx;
	}
	.footer{
		height:98rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 1px 3px 1px rgba(0, 0, 0, 0.22);
		display: flex;
		flex-direction: row;
		justify-content:space-around;
		position: fixed;
		width: 100%;
		left: 0;
		bottom: 0;
		.tabbar-style{
			display: flex;
			flex-direction: column;
			.footer-text{
				margin-top: 10rpx;
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:42rpx;
			}
		}
		.tabbar-style-right{
			display: flex;
			flex-direction: column;
			.footer-png-right{
				width: 29rpx;
				height: 30rpx;
				margin-left: 20rpx;
				margin-top: 15rpx;

			}
			.footer-text{
				margin-top: 10rpx;
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(153,153,153,1);
				line-height:42rpx;
			}
		}
	}
	.container{
		margin-bottom: 35rpx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.margin-top{
		.cu-bar-title{
			text-align: center;
			margin: 57rpx 0 61rpx 0;
		}
		.cu-bar{
			height:95rpx;
			background:rgba(238,238,238,1);
			display: flex;
			flex-direction: row;
			justify-content: space-around;
			.action{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(34,34,34,1);
				line-height:95rpx;
				margin-bottom: 59rpx;
				.text-violet{
					font-size:24rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(34,34,34,1);
					line-height:42rpx;
				}
				.text-red{
					font-size:24rpx;
					font-family:Microsoft YaHei;
					font-weight:400;
					color:rgba(34,34,34,1);
					line-height:42rpx;
				}
			}
		}
		.text-content{
			.answer-text{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:42rpx;
				display: block;
				margin-top: 32rpx;
				margin-bottom: 32rpx;
			}
			.answer-explain{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(51,51,51,1);
				line-height:42rpx;
			}
		}
	}
	.tip{
		height:36rpx;
		font-size:36rpx;
		font-family:Microsoft YaHei;
		font-weight:400;
		color:rgba(34,34,34,1);
		line-height:40rpx;
		
	}
	.answer-png{
		width: 185rpx;
		height: 36rpx;
	}
	.footer-png{
		width: 29rpx;
		height: 30rpx;
		margin-left: 8rpx;
		margin-top: 10rpx;
	}
	.answer-sheet{
		margin: 17rpx 32rpx;
		.swiper-item{
			display: flex;
			flex-direction: row;
			.swiper-item-head{
				display: flex;
				flex-direction: row;
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(34,34,34,1);
				line-height:42rpx;
				margin-bottom:65rpx ;
			}
		}
		.answer-style{
			display: flex;
			flex-direction: row;
			.radio-class{
				width:56rpx;
				height:56rpx;
				border-radius:50%;
				margin: 0 22rpx 33rpx 0;
				color:#1d2087 
			}
			.noRadio{
				width:56rpx;
				height:56rpx;
				border-radius:50%;
				margin: 0 22rpx 33rpx 0;
			}
			.text-class{
				font-size:24rpx;
				font-family:Microsoft YaHei;
				font-weight:400;
				color:rgba(34,34,34,1);
				line-height:42rpx;
			}
		}
	}
</style>
