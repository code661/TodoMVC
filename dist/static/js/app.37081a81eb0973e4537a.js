webpackJsonp([1],{CEE8:function(t,o){},Ew86:function(t,o){},KwzC:function(t,o){},NHnr:function(t,o,e){"use strict";Object.defineProperty(o,"__esModule",{value:!0});var n=e("mvHQ"),s=e.n(n),a=e("7+uW"),i=(e("KwzC"),e("JnRc")),r=e.n(i);r.a.init({appId:"jd2xAttuFp4kJrqPABqsnxYb-gzGzoHsz",appKey:"GILnzxyfsTJem0lbn5n8PUT1"});var c=r.a,u=(e("CEE8"),{data:function(){return{formData:{account:"",password:""},actionType:"login",currentUser:null}},methods:{signUp:function(){var t=new c.User;t.setUsername(this.formData.account),t.setPassword(this.formData.password),t.signUp().then(function(t){this.currentUser=this.getCurrentUser()})},login:function(){var t=this;c.User.logIn(this.formData.account,this.formData.password).then(function(o){t.currentUser=t.getCurrentUser(),t.$emit("hello",t.currentUser)},function(t){console.log(t)})},getCurrentUser:function(){var t=c.User.current();return{id:t.id,createdAt:t.createdAt,username:t.attributes.username}},signOut:function(){c.User.logOut(),this.currentUser=null,window.location.reload()}}}),l={render:function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("div",{staticClass:"login"},[t.currentUser?e("div",{staticClass:"userInfo"},[t._v("\n    🎉用户名："+t._s(t.currentUser.username)+"\n    "),e("button",{staticClass:"pure-button button-xsmall",on:{click:function(o){t.signOut()}}},[e("i",{staticClass:"fas fa-sign-out-alt"}),t._v("\n      注销\n    ")])]):e("div",{staticClass:"inputBox"},[e("div",{staticClass:"pure-menu pure-menu-horizontal"},[e("ul",{staticClass:"pure-menu-list"},[e("li",{staticClass:"pure-menu-item"},[e("a",{staticClass:"pure-menu-link",attrs:{href:"#"},on:{click:function(o){t.actionType="login"}}},[t._v("登录")])]),t._v(" "),e("li",{staticClass:"pure-menu-item"},[e("a",{staticClass:"pure-menu-link",attrs:{href:"#"},on:{click:function(o){t.actionType="signUp"}}},[t._v("注册")])])])]),t._v(" "),e("div",{staticClass:"pure-form"},["login"===t.actionType?e("section",[e("label",{attrs:{for:""}},[t._v("帐号")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.account,expression:"formData.account"}],attrs:{type:"text"},domProps:{value:t.formData.account},on:{input:function(o){o.target.composing||t.$set(t.formData,"account",o.target.value)}}}),t._v(" "),e("label",{attrs:{for:""}},[t._v("密码")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.password,expression:"formData.password"}],attrs:{type:"password"},domProps:{value:t.formData.password},on:{input:function(o){o.target.composing||t.$set(t.formData,"password",o.target.value)}}}),t._v(" "),e("button",{staticClass:"pure-button",attrs:{type:"submit"},on:{click:function(o){t.login()}}},[e("i",{staticClass:"fas fa-sign-in-alt"}),t._v("\n          登录\n        ")])]):e("section",[e("label",{attrs:{for:""}},[t._v("帐号")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.account,expression:"formData.account"}],attrs:{type:"text"},domProps:{value:t.formData.account},on:{input:function(o){o.target.composing||t.$set(t.formData,"account",o.target.value)}}}),t._v(" "),e("label",{attrs:{for:""}},[t._v("密码")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.password,expression:"formData.password"}],attrs:{type:"password"},domProps:{value:t.formData.password},on:{input:function(o){o.target.composing||t.$set(t.formData,"password",o.target.value)}}}),t._v(" "),e("button",{staticClass:"pure-button",attrs:{type:"submit"},on:{click:function(o){t.signUp()}}},[e("i",{staticClass:"fas fa-user-plus"}),t._v("\n          注册\n        ")])])])])])},staticRenderFns:[]};var d=e("VU/8")(u,l,!1,function(t){e("Ew86")},"data-v-6ec738f0",null).exports,f={all:function(t){return t},active:function(t){return t.filter(function(t){return!0==!t.completed})},completed:function(t){return t.filter(function(t){return!0===t.completed})}},p=new a.a({el:".todoapp",data:{inputValue:"",todoList:[],editTodo:null,hashname:"all",currentUser:null,todoId:""},components:{loginBar:d},computed:{remain:function(){return f.active(this.todoList).length},isCompleted:function(){return f.completed(this.todoList).length},isAll:{get:function(){return 0===this.remain},set:function(t){this.todoList.forEach(function(o){o.completed=t})}},filterTodoList:function(){return f[this.hashname](this.todoList)}},created:function(){var t=this;window.onbeforeunload=function(){var o=s()(t.todoList);window.localStorage.setItem("todo",o)};var o=window.localStorage.getItem("todo");this.todoList=JSON.parse(o)},methods:{removeTodo:function(t){this.todoList.splice(t,1),this.saveOrUpdateTodo()},addTodo:function(t){this.inputValue&&(this.todoList.push({content:t,completed:!1}),this.inputValue="",this.saveOrUpdateTodo())},editing:function(t){this.editCache=t.content,this.editTodo=t},editOK:function(t,o){this.editTodo=null,t.content||(this.removeTodo(o),this.saveOrUpdateTodo())},editNo:function(t){this.editTodo=null,t.content=this.editCache},updateTodo:function(){var t=s()(this.todoList),o=c.Object.createWithoutData("TodoFolder",this.todoId);console.log(t),o.set("todoList",t),o.save().then(function(t){console.log("更新了",t.id)})},saveTodo:function(){var t=this,o=s()(this.todoList),e=new(c.Object.extend("TodoFolder")),n=new c.ACL;n.setReadAccess(c.User.current(),!0),n.setWriteAccess(c.User.current(),!0),e.set("todoList",o),e.setACL(n),e.save().then(function(o){t.todoId=o.id,console.log("保存了",o.id,t.todoList)})},saveOrUpdateTodo:function(){this.todoId?this.updateTodo():this.saveTodo()},receiveCurrentUser:function(t){var o=this;this.currentUser=t,new c.Query("TodoFolder").find().then(function(t){if(console.log(t),t){var e=t[0];console.log(o),o.todoId=e.id,console.log("看我这个数组的id",o),o.todoList=JSON.parse(e.attributes.todoList)}else console.log("kong")},function(t){console.log(t)})}},directives:{focus:function(t,o){o.value&&t.focus()}}});window.onhashchange=function(){var t=location.hash.replace(/#\/?/,"");f[t]?p.hashname=t:(location.hash="",p.hashname="all")}}},["NHnr"]);
//# sourceMappingURL=app.37081a81eb0973e4537a.js.map