(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-36182d46"],{"295f":function(e,t,r){"use strict";var s=r("f115"),a=r.n(s);a.a},"7dfe":function(e,t,r){"use strict";r.r(t);var s=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"compressedWrapper"},[r("v-row",[r("v-col",{staticClass:"p-relative",attrs:{cols:"5",sm:"auto"}},[e.userInfos&&e.userInfos.isBanned?r("div",{staticClass:"bannedBadge rounded-xl error"},[r("v-icon",{attrs:{dark:"",size:"60"}},[e._v("mdi-gavel")])],1):e._e(),e.loading?r("span",{staticClass:"placeholder placeholder__profilepicture"}):r("v-img",{staticClass:"rounded-circle",attrs:{src:e.userInfos&&e.userInfos.profilePicture}}),e.loading||!e.userInfos||e.userInfos.profilePicture?e._e():r("v-img",{staticClass:"rounded-circle",attrs:{src:"https://identicon-api.herokuapp.com/"+e.userInfos.username+"/128?format=png",alt:""}}),e.userInfos&&e.userInfos.role&&"superadmin"==e.userInfos.role?r("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on,a=t.attrs;return[r("v-icon",e._g(e._b({staticClass:"p-absolute user-badge",attrs:{size:"40",dark:""}},"v-icon",a,!1),s),[e._v(" mdi-alpha-s-circle ")])]}}],null,!1,4281965305)},[r("span",[e._v(e._s(e.userInfos.role))])]):e._e(),e.userInfos&&e.userInfos.role&&"admin"==e.userInfos.role?r("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on,a=t.attrs;return[r("v-icon",e._g(e._b({staticClass:"p-absolute user-badge",attrs:{size:"40",dark:""}},"v-icon",a,!1),s),[e._v(" mdi-alpha-a-circle ")])]}}],null,!1,3936721771)},[r("span",[e._v(e._s(e.userInfos.role))])]):e._e(),e.userInfos&&e.userInfos.role&&"moderator"==e.userInfos.role?r("v-tooltip",{attrs:{right:""},scopedSlots:e._u([{key:"activator",fn:function(t){var s=t.on,a=t.attrs;return[r("v-icon",e._g(e._b({staticClass:"p-absolute user-badge",attrs:{size:"40",dark:""}},"v-icon",a,!1),s),[e._v(" mdi-alpha-m-circle ")])]}}],null,!1,1953218663)},[r("span",[e._v(e._s(e.userInfos.role))])]):e._e()],1),r("v-col",{attrs:{cols:"7",sm:"auto"}},[r("div",{staticClass:"d-flex flex-column"},[e.loading?r("h1",{staticClass:"placeholder placeholder__name mb-2"}):e._e(),!e.loading&&e.userInfos?r("h1",[e._v(e._s(e.userInfos.username))]):e._e(),e.loading?r("span",{staticClass:"placeholder placeholder__rating"}):r("p",{staticClass:"mb-0"},[e._v(" "+e._s(e.userReviews.length+" "+e.$t("writtenreviews"))+" ")]),e.user&&e.userInfos&&"superadmin"==e.user.role&&e.userInfos.username!==e.user.username&&!e.userInfos.isBanned?r("div",{staticClass:"mt-2"},[e.userInfos&&"admin"==e.userInfos.role||"moderator"==e.userInfos.role?r("v-btn",{attrs:{small:"",color:"error",tile:"",text:""},on:{click:function(t){return e.removePrivileges()}}},[r("v-icon",{staticClass:"mr-2",attrs:{size:"18"}},[e._v("mdi-account-minus")]),e._v(" "+e._s(e.$t("removeprivileges"))+" ")],1):e._e(),"moderator"!=e.userInfos.role&&"admin"!=e.userInfos.role?r("v-btn",{attrs:{small:"",dark:"",tile:"",text:""},on:{click:function(t){return e.addRole("moderator")}}},[r("v-icon",{staticClass:"mr-2",attrs:{size:"18"}},[e._v("mdi-alpha-m")]),e._v(" "+e._s(e.$t("addmoderatorrole"))+" ")],1):e._e(),"moderator"!=e.userInfos.role&&"admin"!=e.userInfos.role?r("v-btn",{attrs:{small:"",dark:"",tile:"",text:""},on:{click:function(t){return e.addRole("admin")}}},[r("v-icon",{staticClass:"mr-2",attrs:{size:"18"}},[e._v("mdi-alpha-a")]),e._v(" "+e._s(e.$t("addadminrole"))+" ")],1):e._e(),r("v-btn",{attrs:{small:"",color:"error",tile:"",text:""},on:{click:function(t){return e.banUser()}}},[r("v-icon",{staticClass:"mr-2",attrs:{size:"18"}},[e._v("mdi-gavel")]),e._v(" "+e._s(e.$t("banuser"))+" ")],1)],1):e._e()])])],1),r("v-row",{staticClass:"mt-10"},[e.loading?r("v-col",{attrs:{cols:"12"}},[r("ReviewPlaceholder")],1):e._l(e.userReviews,(function(t){return r("v-col",{key:t.id,attrs:{cols:"12"}},[r("v-card",{staticClass:"grey darken-3 review",attrs:{dark:""}},[t.restricted?r("v-alert",{staticClass:"ma-0",attrs:{type:"error",icon:"mdi-alert-octagon",outlined:"",dense:""}},[e._v(" "+e._s(e.$t("thisreviewhasbeenrestricted"))+" ")]):e._e(),e.user&&t.author===e.user.username?r("div",{staticClass:"px-4 pt-2"},[e.selectedReview.id==t.id||t.restricted?e._e():r("v-chip",{staticClass:"mr-2",attrs:{color:"indigo",small:""},on:{click:function(r){return e.editReview(t)}}},[r("v-icon",{attrs:{left:"",size:"15"}},[e._v("mdi-pencil")]),e._v(" "+e._s(e.$t("edit"))+" ")],1),e.selectedReview.id==t.id?r("v-chip",{staticClass:"mr-2",attrs:{color:"indigo",small:""},on:{click:function(t){return e.cancelEdit()}}},[r("v-icon",{attrs:{left:"",size:"15"}},[e._v("mdi-pencil-off")]),e._v(" "+e._s(e.$t("cancel"))+" ")],1):e._e(),r("v-chip",{staticClass:"mr-2",attrs:{color:"indigo",small:""},on:{click:function(r){return e.deleteReview(t.id)}}},[r("v-icon",{attrs:{left:"",size:"15"}},[e._v("mdi-delete")]),e._v(" "+e._s(e.$t("delete"))+" ")],1),r("v-snackbar",{attrs:{color:"success",outlined:"",right:"",timeout:"2000",bottom:""},model:{value:e.reviewDeleted,callback:function(t){e.reviewDeleted=t},expression:"reviewDeleted"}},[e._v(" "+e._s(e.$t("reviewdeleted"))+" ")])],1):e._e(),r("v-card-title",{staticClass:"pb-0 pointer",on:{click:function(r){return e.navigateToMovie(t.movieId)}}},[e._v(e._s(t.movieName))]),t.rating&&e.selectedReview.id==t.id?r("v-rating",{staticClass:"px-4",attrs:{"background-color":"grey",color:"yellow",length:"5",small:"",dense:""},model:{value:e.selectedReview.rating,callback:function(t){e.$set(e.selectedReview,"rating",t)},expression:"selectedReview.rating"}}):r("v-rating",{staticClass:"px-4",attrs:{"background-color":"grey",color:"yellow",length:"5",readonly:"",value:t.rating,small:"",dense:""}}),e.selectedReview.id==t.id?r("v-card-text",[r("v-textarea",{attrs:{solo:"","background-color":"grey darken-4","hide-details":"auto"},model:{value:e.selectedReview.description,callback:function(t){e.$set(e.selectedReview,"description",t)},expression:"selectedReview.description"}})],1):r("v-card-text",[r("p",{class:{restricted:t.restricted}},[e._v(" "+e._s(t.description)+" ")])]),e.selectedReview.id==t.id?r("v-card-actions",{staticClass:"px-4 pb-3"},[r("v-btn",{staticClass:"mr-2",attrs:{small:"",color:"indigo"},on:{click:function(t){return e.sendEditedReview()}}},[e._v(" "+e._s(e.$t("save"))+" ")])],1):e._e()],1)],1)}))],2),r("v-snackbar",{attrs:{color:"success",timeout:"2000",dark:"",outlined:"",right:"",bottom:""},model:{value:e.reviewEditedSuccess,callback:function(t){e.reviewEditedSuccess=t},expression:"reviewEditedSuccess"}},[e._v(" "+e._s(e.$t("reviewedited"))+" ")])],1)},a=[],i=(r("a4d3"),r("e01a"),r("96cf"),r("1da1")),n=r("d481"),o=r("a18c"),c=r("dc59"),l={components:{ReviewPlaceholder:n["a"]},data:function(){return{loading:!0,userInfos:{},userReviews:[],reviewDeleted:!1,selectedReview:{id:"",description:"",rating:null},reviewEditedSuccess:!1}},methods:{banUser:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r,s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$route.params.userId,s=e.userInfos.username,t.prev=2,t.next=5,c["b"].collection("users").doc(r).update({username:"[banned] ".concat(s),role:"user",isBanned:!0});case 5:t.next=10;break;case 7:t.prev=7,t.t0=t["catch"](2),console.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[2,7]])})))()},addRole:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){var s;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return s=t.$route.params.userId,r.prev=1,r.next=4,c["b"].collection("users").doc(s).update({role:e});case 4:r.next=9;break;case 6:r.prev=6,r.t0=r["catch"](1),console.error(r.t0);case 9:case"end":return r.stop()}}),r,null,[[1,6]])})))()},removePrivileges:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return r=e.$route.params.userId,t.prev=1,t.next=4,c["b"].collection("users").doc(r).update({role:"user"});case 4:t.next=9;break;case 6:t.prev=6,t.t0=t["catch"](1),console.error(t.t0);case 9:case"end":return t.stop()}}),t,null,[[1,6]])})))()},navigateToMovie:function(e){o["a"].push({name:"movie-detail",params:{movieId:e}})},deleteReview:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,c["b"].collection("reviews").doc(e).delete();case 3:t.reviewDeleted=!0,setTimeout((function(){t.reviewDeleted=!1}),2e3),r.next=10;break;case 7:r.prev=7,r.t0=r["catch"](0),console.error(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()},editReview:function(e){this.selectedReview.id=e.id,this.selectedReview.description=e.description,this.selectedReview.rating=e.rating},cancelEdit:function(){this.selectedReview.id=null,this.selectedReview.description=null,this.selectedReview.rating=null},sendEditedReview:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,r=e.selectedReview,t.next=4,c["b"].collection("reviews").doc(r.id).update({rating:r.rating,description:r.description,edited:new Date});case 4:e.reviewEditedSuccess=!0,setTimeout((function(){e.reviewEditedSuccess=!1}),2e3),e.cancelEdit(),t.next=12;break;case 9:t.prev=9,t.t0=t["catch"](0),console.error(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()}},watch:{userInfos:function(e){e&&(document.title=e.username+o["b"])},"$route.params.userId":function(e){var t=this;this.loading=!0,this.$bind("userInfos",c["b"].collection("users").doc(e)),this.$bind("userReviews",c["b"].collection("reviews").where("userId","==",e).orderBy("date","desc")).then((function(){t.loading=!1}))}},created:function(){var e=this,t=this.$route.params.userId;this.$bind("userInfos",c["b"].collection("users").doc(t)),this.$bind("userReviews",c["b"].collection("reviews").where("userId","==",t).orderBy("date","desc")).then((function(){e.loading=!1}))}},d=l,u=(r("295f"),r("2877")),v=r("6544"),p=r.n(v),m=r("0798"),f=r("8336"),w=r("b0af"),_=r("99d9"),h=r("cc20"),g=r("62ad"),b=r("132d"),k=r("adda"),I=r("1d4d"),R=r("0fd9"),x=r("2db4"),C=r("a844"),$=r("3a2f"),V=Object(u["a"])(d,s,a,!1,null,"16c7835a",null);t["default"]=V.exports;p()(V,{VAlert:m["a"],VBtn:f["a"],VCard:w["a"],VCardActions:_["a"],VCardText:_["b"],VCardTitle:_["c"],VChip:h["a"],VCol:g["a"],VIcon:b["a"],VImg:k["a"],VRating:I["a"],VRow:R["a"],VSnackbar:x["a"],VTextarea:C["a"],VTooltip:$["a"]})},f115:function(e,t,r){}}]);
//# sourceMappingURL=chunk-36182d46.a37e3253.js.map