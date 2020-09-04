(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-th"],{"2dea":function(t,e,n){"use strict";n.r(e);var r=n("8508"),i=n("fe91");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("fff5");var a,c=n("f0c5"),f=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],a);e["default"]=f.exports},"4dc6":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"15",color:"#3b4246",thAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.thAlign=this.align:this.thAlign=this.tr.align},computed:{thAlignCpd:function(){var t="";switch(this.thAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r},"51f6":function(t,e,n){},8508:function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},fe91:function(t,e,n){"use strict";n.r(e);var r=n("4dc6"),i=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=i.a},fff5:function(t,e,n){"use strict";var r=n("51f6"),i=n.n(r);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-th-create-component',
    {
        'components/t-table/t-th-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2dea"))
        })
    },
    [['components/t-table/t-th-create-component']]
]);
