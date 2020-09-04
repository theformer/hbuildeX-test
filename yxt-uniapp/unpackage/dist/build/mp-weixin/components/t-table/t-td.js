(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/t-table/t-td"],{"08cd":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return r}));var i=function(){var t=this,e=t.$createElement;t._self._c},a=[]},"6cb1":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={props:{align:String},data:function(){return{thBorder:"1",borderColor:"#d0dee5",fontSize:"14",tdAlign:"center"}},inject:["table","tr"],created:function(){this.thBorder=this.table.border,this.borderColor=this.table.borderColor,this.fontSize=this.tr.fontSize,this.color=this.tr.color,this.align?this.tdAlign=this.align:this.tdAlign=this.tr.align},computed:{tdAlignCpd:function(){var t="";switch(this.tdAlign){case"left":t="flex-start";break;case"center":t="center";break;case"right":t="flex-end";break;default:t="center";break}return t}}};e.default=r},"6fa6":function(t,e,n){"use strict";var r=n("b922"),i=n.n(r);i.a},"8efe":function(t,e,n){"use strict";n.r(e);var r=n("08cd"),i=n("bdb5");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("6fa6");var o,c=n("f0c5"),u=Object(c["a"])(i["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],o);e["default"]=u.exports},b922:function(t,e,n){},bdb5:function(t,e,n){"use strict";n.r(e);var r=n("6cb1"),i=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);e["default"]=i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/t-table/t-td-create-component',
    {
        'components/t-table/t-td-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("8efe"))
        })
    },
    [['components/t-table/t-td-create-component']]
]);
