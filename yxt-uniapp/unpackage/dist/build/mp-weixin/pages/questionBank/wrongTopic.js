(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/questionBank/wrongTopic"],{2175:function(t,e,s){},2896:function(t,e,s){"use strict";var n;s.d(e,"b",(function(){return o})),s.d(e,"c",(function(){return i})),s.d(e,"a",(function(){return n}));var o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"51d5":function(t,e,s){"use strict";s.r(e);var n=s("2896"),o=s("cf1a");for(var i in o)"default"!==i&&function(t){s.d(e,t,(function(){return o[t]}))}(i);s("5df5");var r,a=s("f0c5"),u=Object(a["a"])(o["default"],n["b"],n["c"],!1,null,"6b46f682",null,!1,n["a"],r);e["default"]=u.exports},"5df5":function(t,e,s){"use strict";var n=s("2175"),o=s.n(n);o.a},"84f9":function(t,e,s){"use strict";(function(t){s("d5a6");n(s("66fd"));var e=n(s("51d5"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,s("543d")["createPage"])},be2c:function(t,e,s){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={data:function(){return{subCourseId:"",list:[],chapterId:"",questionIds:[],tkMsg:"",type:"",topiclist:[]}},methods:{startTopic:function(e){var s=this;this.questionIds=[];for(var n=0;n<e.questions.length;n++)this.questionIds.push(e.questions[n].id);this.chapterId=e.id,t.request({url:this.baseUrl+"/gxplatform/tk/wrongreview/getWrongQuestionLibList",data:{type:this.type,subCourseId:this.subCourseId,chapterId:this.chapterId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(e){var n=JSON.parse(JSON.stringify(e.data.data));null!=n?(s.topiclist=[],n.forEach((function(t){t.questionLibs.forEach((function(t){s.topiclist.push(t)}))})),t.setStorageSync("topiclist",s.topiclist),t.navigateTo({url:"answer-sheet?type="+s.type+"&subCourseId="+s.subCourseId+"&isShow=1",animationType:"pop-in",animationDuration:300})):t.showToast({icon:"none",title:e.data.message})}})}},onShow:function(){var e=this;this.tkMsg=this.$store.state.userInfo.tkMsg,1==this.type?t.request({url:this.baseUrl+"/gxplatform/tk/wrongreview/getZgzWrongListBySubCourseId",data:{subCourseId:this.subCourseId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(s){var n=JSON.parse(JSON.stringify(s.data.data));if(null==n)return t.showToast({icon:"none",title:s.data.message}),void(e.list=[]);e.list=n}}):t.request({url:this.baseUrl+"/gxplatform/tk/wrongreview/getChapterWrongReviewsListBySubCourseId",data:{subCourseId:this.subCourseId},method:"GET",header:{"content-type":"application/x-www-form-urlencoded",Cookie:"JSESSIONID="+this.tkMsg},success:function(s){var n=JSON.parse(JSON.stringify(s.data.data));if(null==n)return t.showToast({icon:"none",title:s.data.message}),void(e.list=[]);e.list=n}})},onLoad:function(t){this.subCourseId=t.subCourseId,this.type=t.type}};e.default=s}).call(this,s("543d")["default"])},cf1a:function(t,e,s){"use strict";s.r(e);var n=s("be2c"),o=s.n(n);for(var i in n)"default"!==i&&function(t){s.d(e,t,(function(){return n[t]}))}(i);e["default"]=o.a}},[["84f9","common/runtime","common/vendor"]]]);