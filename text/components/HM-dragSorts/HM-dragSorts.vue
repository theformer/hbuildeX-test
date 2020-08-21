<template>
	<view class="HM-drag-sort" >
		<view class="list color" :class="[listSwitch?'show':'hide']">
			<block v-for="(row,index) in dragListA" :key="index" :index="index">
				<view class="rowA" :id="'rowA'+index">
					<view class="modules" @tap="triggerClick(index,row)">
						<view class="drag" :data-index="index" data-type="A" :data-isdelay="isdelay" :data-rownum="dragListA.length"
							<!-- #ifndef MP-WEIXIN -->
							 @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove" @touchend.stop.prevent="drag.touchend"
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							 @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend"
							<!-- #endif -->
						>
							<view class="content">
								<image v-if="row.icon" class="icon" :src="row.icon"></image>
								<text class="text">{{row.name}}</text>
							</view>
						</view>
						<view class="clear">
							<image src="../../static/my/图层1.png" class="clear-img" @click="clearSubCourse(index,row)" ></image>
						</view>
							
					</view>
				</view>
			</block>
		</view>
		<!-- #ifndef H5 -->
		<!-- 非H5端，直接切换list，避免看到排序渲染的过程(闪动) 原谅我找不到更好的方法了 ╮(╯▽╰)╭ -->
		<view class="list color" :class="[listSwitch?'hide':'show']">
			<block v-for="(row,index) in dragListB" :key="index" :index="index">
				<view class="rowB" :id="'rowB'+index">
					<view class="modules" @tap="triggerClick(index,row)">
						<view class="drag" :data-index="index" data-type="B" :data-isdelay="isdelay" :data-rownum="dragListB.length"
							<!-- #ifndef MP-WEIXIN -->
							 @touchstart.stop.prevent="drag.touchstart" @touchmove.stop.prevent="drag.touchmove" @touchend.stop.prevent="drag.touchend"
							<!-- #endif -->
							<!-- #ifdef MP-WEIXIN -->
							 @touchstart="drag.touchstart" @touchmove="drag.touchmove" @touchend="drag.touchend"
							<!-- #endif -->
						>
						<view class="content">
							<text  class="text">{{row.name}}</text>
							<image v-if="row.icon" class="icon" :src="row.icon"></image>
						</view>
						</view>
						<view class="clear">
							<image src="../../static/my/图层1.png" class="clear-img" @click="clearSubCourse(index,row)" ></image>
						</view>
					</view>
				</view>
			</block>
		</view>
		<!-- #endif -->
	</view>
</template>
<script src="./drag.wxs" module="drag" lang="wxs"></script>
<script>
	export default {
		name: 'HM-dragSort',
		data() {
			return {
				dragListA:[],
				dragListB:[],
				listSwitch: true,
				isdelay: false
			}
		},
		props: {
			list: {
				value: Array,
				default: []
			}
		},
		watch: {
			list: {
				handler(val) {
					this.initList(); //数据变化重新初始化list
				},
				immediate: true
			}
		},
		mounted() {
			// #ifndef H5
			this.isdelay = true;
			// #endif
		},
		methods: {
			initList(){
				if(this.dragListA.length>0){
					//一个延迟，防止闪动
					setTimeout(()=>{
						this.dragListA = this.list;
						this.dragListB = this.list;
					},50)
				}else{
					this.dragListA = this.list;
					this.dragListB = this.list;
				}
			},
			triggerClick(index,row){
				this.$emit('onclick', {index:index,value:row});
			},
			//兼容微信小程序震动
			vibrate(){
				uni.vibrateShort()
			},
			clearSubCourse(index,row){
				console.log(index,row,'好家伙我想看看自己的值')
				this.$emit('clear-course', {index:index,value:row});
			
				
			},
			sort(e) {
				let tmpList = JSON.parse(JSON.stringify(this.dragListA));
				tmpList.splice(e.offset, 0, tmpList.splice(e.index, 1)[0]);
				// #ifdef H5
				this.dragListA = [];
				this.dragListA = tmpList;
				// #endif
				// #ifndef H5
					if(this.listSwitch){
						this.dragListB = [];
						this.dragListB = tmpList;
						// #ifdef MP-WEIXIN
						setTimeout(()=>{
						// #endif
							// #ifndef MP-WEIXIN
							this.$nextTick(()=>{
							// #endif
								this.listSwitch = !this.listSwitch;
								this.$nextTick(()=>{
									this.dragListA = [];
									this.dragListA = tmpList;
								})
							// #ifndef MP-WEIXIN
							})
							// #endif
						// #ifdef MP-WEIXIN
						},50)
						// #endif
					}else{
						this.dragListA = [];
						this.dragListA = tmpList;
						// #ifdef MP-WEIXIN
						setTimeout(()=>{
						// #endif
						// #ifndef MP-WEIXIN
						this.$nextTick(()=>{
						// #endif
							this.listSwitch = !this.listSwitch; 
							this.$nextTick(()=>{
								this.dragListB = [];
								this.dragListB = tmpList; 
							})
						// #ifdef MP-WEIXIN
						},50)
						// #endif
						// #ifndef MP-WEIXIN
						})
						// #endif
					}
				// #endif
				this.$emit('confirm', {list:tmpList});
			}
		}
	}
</script>

<style lang="scss">
	.clear{
		margin: 30rpx 30rpx;
		.clear-img{
		 width: 35rpx;
		 height: 35rpx;
		}
	}
	
	$row-Height: 45px;
	//默认
	$text-color : #000000;
	$border-color :#c8c7cb;
	$background-color :rgba(255, 255, 255, 1);
	$background-color-moveing :rgba(255, 255, 255, 0.8);
	$shadow-background-color-moveing :rgba(0, 0, 0, 0.5);
	$icon-drag-color:#c7c7cb;
	//Dark模式
	$Dark-text-color : #ffffff;
	$Dark-border-color :#3d3d40;
	$Dark-background-color :rgba(28, 28, 29, 1);
	$Dark-background-color-moveing :rgba(28, 28, 29, 0.8);
	$Dark-shadow-background-color-moveing :rgba(0, 0, 0, 0.5);
	$Dark-icon-drag-color:#5a5a5e;
	
	.HM-drag-sort {
		// touch-action: none;
		display: flex;
		flex-direction: column;

		.list {
			display: flex;
			flex-direction: column;
			transform-style: preserve-3d;
			-webkit-transform-style: preserve-3d;
			transform: translateY(0px) translateZ(5px);
			-webkit-transform: translateY(0px) translateZ(5px);
			//默认颜色
			&.color{
				border-bottom: 1rpx $border-color solid;
				border-top: 1rpx $border-color solid;
				.rowA,
				.rowB {
					background-color: $background-color;
					&.move {
						background-color: $background-color-moveing;
						box-shadow: 0 1px 5px $shadow-background-color-moveing;
					}
					.modules {
						border-bottom: 1rpx $border-color solid;
						.content{
							.text{
								color: $text-color;
							}
						}
						.iconfont {
							color: $icon-drag-color;
						}
					}
				}
			}
			// 暗黑模式
			@media (prefers-color-scheme: dark){
			    //Dark模式
			    &.color{
			    	border-bottom: 1rpx $Dark-border-color solid;
			    	border-top: 1rpx $Dark-border-color solid;
			    	.rowA,
			    	.rowB {
			    		background-color: $Dark-background-color;
			    		&.move {
			    			background-color: $Dark-background-color-moveing;
			    			box-shadow: 0 1px 5px $Dark-shadow-background-color-moveing;
			    		}
			    		.modules {
			    			border-bottom: 1rpx $Dark-border-color solid;
			    			.content{
			    				.text{
			    					color: $Dark-text-color;
			    				}
			    			}
			    			.iconfont {
			    				color: $Dark-icon-drag-color;
			    			}
			    		}
			    	}
			    }
			}
			&.show {
				display: flex;
			}

			&.hide {
				display: none;
			}

			.rowA,
			.rowB {
				display: flex;
				flex-direction: row;
				width: 100%;
				height: $row-Height;
				
				transform: translateY(0px) translateZ(5px);
				-webkit-transform: translateY(0px) translateZ(5px);

				&:last-child {
					.modules {
						border-bottom-width: 0;
					}
				}

				&.ani {
					transition: all 0.2s;
					-webkit-transition: all 0.2s;
				}

				&.move {
					

					.modules {
						border-bottom-width: 0;
					}
				}

				.modules {
					// margin-left: 12px;
					// padding-right: 12px;
					// width: 100%;
					// display: flex;
					// flex-direction: row;
					// align-items: center;
					// justify-content: space-between;
					
					
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
					
					
					
					.drag {
						height: $row-Height;
						flex-shrink: 0;
						display: flex;
						flex-direction: row;
						.content{
							display: flex;
							flex-direction: row;
							align-items: center;
							
							.icon{
								width: 30px;
								height: 30px;
								border-radius: 6px;
								margin-right: 13px;
							}
							
							.text{
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
						}
						.iconfont{
							font-size: 22px;
						}
					}
				}
				
			}
		}

	}
	@font-face {
		font-family:"HM-DS-font";
		src: url('data:font/truetype;charset=utf-8;base64,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') format('truetype');
	}
	.iconfont {
		font-family: "HM-DS-font" !important;
		font-style: normal;
		&.icon-drag {
			&:before {
				content: "\e6e4";
			}
		}
		
	}
</style>
