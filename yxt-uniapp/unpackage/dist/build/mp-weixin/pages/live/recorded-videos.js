(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/live/recorded-videos"],{"899e":function(t,e,i){"use strict";i.r(e);var s=i("c469"),a=i.n(s);for(var o in s)"default"!==o&&function(t){i.d(e,t,(function(){return s[t]}))}(o);e["default"]=a.a},a89e:function(t,e,i){"use strict";i.r(e);var s=i("ce1f"),a=i("899e");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("de7a");var r,d=i("f0c5"),n=Object(d["a"])(a["default"],s["b"],s["c"],!1,null,"c0b17048",null,!1,s["a"],r);e["default"]=n.exports},c469:function(t,i,s){"use strict";(function(t){Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var s={data:function(){return{videoSrc:"",index:0,popupShow:!1,tkMsg:"",subCourseId:"",videos:[],initialTime:1,courseName:"",courseId:"",courseNameState:"",courseIdState:"",demo:{top:0,height:0},certificateList:[],certificate:"",certificateId:"",listCourse:[],show:!1,courseIndex:"",typeId:{},courseObj:{},stringing:"",textClick:"",courseList:[],videoId:"",itemIdVal:"",userId:"",itemId:[],startTime:0,realTimeOfWeb:0,studyTime:0,studyprogress:0,watchTime:0,duration:0,pauseTime:0,oneId:"",seeTime:[],listIndex:[]}},onReady:function(e){this.videoContext=t.createVideoContext("video",this)},methods:{addWatchTime:function(){this.studyTime+=.25},playClick:function(t){var e=this;e.watchTime=setInterval((function(){e.addWatchTime()}),250),e.getAllPlayVideo(),console.log(e.watchTime,"我是当前进度条时间",this.studyTime)},pauseClick:function(t){this.watchTime&&(clearInterval(this.watchTime),this.watchTime=0),this.saveWatchRecordFun(),this.studyTime=0,this.itemId.push(this.oneId)},endedClick:function(t){this.studyTime=0,this.watchTime&&(clearInterval(this.watchTime),this.watchTime=0)},videoErrorCallback:function(e){t.showModal({content:"视频有误",showCancel:!1}),this.studyTime=0,this.watchTime=0},timeupdateClick:function(t){},saveWatchRecordFun:function(e){var i=(new Date).getTime();if(this.realTimeOfWeb=i-this.startTime,this.itemId.length>1)if(this.itemId[this.itemId.length-1]!==this.itemId[this.itemId.length-2])this.itemIdVal=this.itemId[this.itemId.length-2],this.watchTime=this.studyTime+this.initialTime;else{this.itemIdVal=this.itemId[this.itemId.length-1];for(var s=0;s<this.listIndex.length;s++)for(var a=0;a<this.listInde[a].length;a++)(this.itemIdVal=this.listInde[a].id)&&(this.watchTime=this.listInde[a].watchTime+this.studyTime)}else{var o=this.itemId;this.itemIdVal=o[0],this.watchTime=this.studyTime+this.initialTime}this.studyTime>1&&this.duration>1&&(this.watchTime>this.duration&&(this.watchTime=this.studyTime),t.request({url:this.baseUrl+"/gxplatform/front/learning/updateVideoLearningProgress",data:{studyTime:parseInt(this.studyTime),watchTime:parseInt(this.watchTime),duration:parseInt(this.duration),realTimeOfWeb:this.realTimeOfWeb,startTime:this.startTime,videoId:this.itemIdVal},method:"POST",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(t){t.code}}))},getAllPlayVideo:function(){var e=this;if(this.itemId.length>1)this.itemId[this.itemId.length-1]!==this.itemId[this.itemId.length-2]?this.itemIdVal=this.itemId[this.itemId.length-2]:this.itemIdVal=this.itemId[this.itemId.length-1];else{var i=this.itemId;this.itemIdVal=i[0]}t.request({url:this.baseUrl+"/gxplatform/front/learning/saveStartTimeBeforePlay",data:{userId:this.userId,videoId:this.itemIdVal},method:"POST",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(t){1==t.data.code&&(e.startTime=t.data.data)}})},changVideosUrl:function(i,s){var a=this;clearInterval(this.watchTime),this.textClick=i.videoTitle,this.oneId=i.id,this.itemId.push(i.id),i.duration.length>0&&(this.duration=i.duration,this.duration=this.duration.split(":"),3==this.duration.length?this.duration=parseInt(3600*this.duration[0])+parseInt(60*this.duration[1])+parseInt(this.duration[2]):2==this.duration.length?this.duration=parseInt(60*this.duration[0])+parseInt(this.duration[1]):this.duration=parseInt(e.duration[0]));var o=i.videoTitle,r=(new Date).getTime();this.realTimeOfWeb=r-this.startTime,this.getAllPlayVideo(),491!=this.certificateId?t.request({url:this.baseUrl+"/gxplatform/front/video/getChapterVideosBySubCourseId",data:{subCourseId:this.subCourseId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(t){if(1==t.data.code){var e=t.data.data;a.listIndex=t.data.data,e.forEach((function(t){t.videos.forEach((function(t){o==t.videoTitle&&(a.initialTime=t.watchTime,a.videoSrc=t.videoUrl.replace("tk.360xkw.com","s1.v.360xkw.com"),a.videoContext.seek(a.initialTime))}))}))}}}):t.request({url:this.baseUrl+"/gxplatform/front/learning/getAllChapterVideosBySubCourseId",data:{subCourseId:this.subCourseId},method:"POST",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(t){if(1==t.data.code){var e=t.data.data.chapterVideosList;e.forEach((function(t){t.videoList.forEach((function(t){o==t.videoTitle&&(a.initialTime=t.watchTime,a.videoContext.seek(a.initialTime),a.videoSrc=t.videoUrl.replace("tk.360xkw.com","s1.v.360xkw.com"))}))}))}}})},saveClick:function(e){var i=this;this.popupShow=!1,this.courseName=this.listCourse[this.courseIndex].name,t.request({url:this.baseUrl+"/gxplatform/front/video/getChapterVideosBySubCourseId",data:{subCourseId:this.subCourseId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(e){var s=JSON.parse(JSON.stringify(e.data.data));if(!(1==e.data.code&&e.data.data.length>0))return i.videos=[],i.videoSrc="",void t.showToast({icon:"none",title:e.data.message});s.forEach((function(t){t.videos.forEach((function(t){t.videoUrl=t.videoUrl.replace("tk.360xkw.com","s1.v.360xkw.com")}))})),i.videos=s,i.videos.length>0&&t.request({url:i.baseUrl+"/gxplatform/front/video/getLatestVideoLogByStudentId",data:{courseId:i.certificateId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+i.tkMsg},success:function(t){1==t.data.code&&null!=t.data.data&&(t.data.data.videoUrl=t.data.data.videoUrl.replace("tk.360xkw.com","s1.v.360xkw.com"),i.videoSrc=t.data.data.videoUrl,i.initialTime=t.data.data.watchTime,i.videoId=t.data.data.videoId,i.itemId.push(t.data.data.videoId),i.oneId=t.data.data.videoId,i.videos.forEach((function(t){t.videos.forEach((function(e){e.id==i.videoId&&(t.open=!0,i.textClick=e.videoTitle,e.duration=e.duration.split(":"),3==e.duration.length?e.duration=parseInt(3600*e.duration[0])+parseInt(60*e.duration[1])+parseInt(e.duration[2]):2==e.duration.length?e.duration=parseInt(60*e.duration[0])+parseInt(e.duration[1]):e.duration=parseInt(e.duration[0]),i.duration=e.duration)}))})),i.videoContext.seek(i.initialTime))}})}})},chooseSubject:function(){this.popupShow=!0,""==this.stringing?this.stringing=this.listCourse[0].name:this.listCourse[this.courseIndex].id&&(this.subCourseId=this.listCourse[this.courseIndex].id)},coursesVal:function(t){this.courseIndex=t,this.subCourseId=this.listCourse[t].id,this.stringing=this.listCourse[this.courseIndex].name}},onShow:function(){var e=this;this.typeId=t.getStorageSync("typeId");var i=t.getStorageSync("userInfo");if(this.courseObj=t.getStorageSync("courseObj"),this.courseList=t.getStorageSync("courseList"),this.certificateList=[],this.videoSrc="",this.userId=this.$store.state.userInfo.id,i.courses.forEach((function(t){e.certificateList.push({label:t.name,value:t.id,extra:t.childrens})})),1==this.typeId.courseIdType){this.courseList=[];for(var s=0;s<this.certificateList.length;s++)this.typeId.courseId==this.certificateList[s].value&&(this.courseList.push(this.certificateList[s]),this.listCourse=this.certificateList[s].extra,this.courseName=this.certificateList[s].extra[0].name,this.subCourseId=this.certificateList[s].extra[0].id,this.certificate=this.certificateList[s].label,this.certificateId=this.certificateList[s].value);this.courseList.length>1&&this.courseList.splice(0,1),t.setStorageSync("courseList",this.courseList)}else if(!0===this.courseObj.courseType){this.subCourseId=this.courseObj.subCourseId,this.certificateId=this.courseObj.courseId;for(var a=0;a<this.certificateList.length;a++)if(this.certificateId==this.certificateList[a].value){this.listCourse=this.certificateList[a].extra,this.certificate=this.certificateList[a].label;for(var o=0;o<this.certificateList[a].extra.length;o++)this.subCourseId==this.certificateList[a].extra[o].id&&(this.courseName=this.certificateList[a].extra[o].name)}}else this.courseList.length>0?(this.certificate=this.courseList[0].label,this.certificateId=this.courseList[0].value,this.listCourse=this.courseList[0].extra,this.courseName=this.courseList[0].extra[0].name,this.subCourseId=this.courseList[0].extra[0].id):(this.subCourseId=this.certificateList[0].extra[0].id,this.certificate=this.certificateList[0].label,this.certificateId=this.certificateList[0].value,this.listCourse=this.certificateList[0].extra,this.courseName=this.certificateList[0].extra[0].name,t.setStorageSync("courseList",[this.certificateList[0]]));this.tkMsg=this.$store.state.userInfo.tkMsg,t.request({url:this.baseUrl+"/gxplatform/front/video/getChapterVideosBySubCourseId",data:{subCourseId:this.subCourseId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(i){var s=JSON.parse(JSON.stringify(i.data.data));if(!(1==i.data.code&&i.data.data.length>0))return e.videos=[],e.videoSrc="",void t.showToast({icon:"none",title:i.data.message});s.forEach((function(t){t.open=!1,t.videos.forEach((function(t){t.videoUrl=t.videoUrl.replace("tk.360xkw.com","s1.v.360xkw.com")}))})),e.videos=s,e.videos.length>0&&t.request({url:e.baseUrl+"/gxplatform/front/video/getLatestVideoLogByStudentId",data:{courseId:e.certificateId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+e.tkMsg},success:function(t){1==t.data.code&&null!=t.data.data&&(t.data.data.videoUrl=t.data.data.videoUrl.replace("tk.360xkw.com","s1.v.360xkw.com"),e.videoSrc=t.data.data.videoUrl,e.initialTime=t.data.data.watchTime,e.videoId=t.data.data.videoId,e.oneId=t.data.data.videoId,e.itemId.push(e.videoId),e.videos.forEach((function(t){t.videos.forEach((function(i){i.id==e.videoId&&(t.open=!0,e.textClick=i.videoTitle,i.duration=i.duration.split(":"),3==i.duration.length?i.duration=parseInt(3600*i.duration[0])+parseInt(60*i.duration[1])+parseInt(i.duration[2]):2==i.duration.length?i.duration=parseInt(60*i.duration[0])+parseInt(i.duration[1]):i.duration=parseInt(i.duration[0]),e.duration=i.duration)}))})))}})}})}};i.default=s}).call(this,s("543d")["default"])},ce1f:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return s}));var s={uPopup:function(){return i.e("node-modules/uview-ui/components/u-popup/u-popup").then(i.bind(null,"efe2"))},uCollapse:function(){return i.e("node-modules/uview-ui/components/u-collapse/u-collapse").then(i.bind(null,"8988"))},uCollapseItem:function(){return i.e("node-modules/uview-ui/components/u-collapse-item/u-collapse-item").then(i.bind(null,"915c"))}},a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},d711:function(t,e,i){},de7a:function(t,e,i){"use strict";var s=i("d711"),a=i.n(s);a.a},f92f:function(t,e,i){"use strict";(function(t){i("d5a6");s(i("66fd"));var e=s(i("a89e"));function s(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["f92f","common/runtime","common/vendor"]]]);