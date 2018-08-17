// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'todomvc-app-css/index.css'
import loginBar from './components/loginBar.vue'
import AV from './lib/leancloud'

let filters = {
  all(todos) {
    return todos
  },
  active(todos) {
    return todos.filter(todo => !todo.completed === true)
  },
  completed(todos) {
    return todos.filter(todo => todo.completed === true)
  }
}

let app = new Vue({
  el: '.todoapp',
  data: {
    inputValue: '',
    todoList: [],
    editTodo: null,
    hashname: 'all',
    currentUser: null,
    todoId: '',
  },
  components:{
    loginBar
  },
  computed: {
    remain() {
      return filters.active(this.todoList).length
    },
    isCompleted() {
      return filters.completed(this.todoList).length
    },
    isAll: {
      get: function () {
        return this.remain === 0
      },
      set: function (val) {
        this.todoList.forEach(
          (todo) => {
            todo.completed = val
          }
        )
      }
    },
    filterTodoList(){
      return filters[this.hashname](this.todoList)
    }
  },
  created(){
    window.onbeforeunload= ()=> {
      let dataString = JSON.stringify(this.todoList)
      window.localStorage.setItem('todo',dataString)
    }
    let oldDataString = window.localStorage.getItem('todo')
    this.todoList = JSON.parse(oldDataString)
  },
  methods: {
    removeTodo(index) {
      this.todoList.splice(index, 1)
      this.saveOrUpdateTodo()
    },
    addTodo(value) {
      if (!this.inputValue){
        return
      }
      this.todoList.push({ content: value, completed: false })
      this.inputValue = ''
      this.saveOrUpdateTodo()
    },
    editing(item) {
      this.editCache = item.content
      this.editTodo = item
    },
    editOK(item,index){
      this.editTodo = null
      if (!item.content){
        this.removeTodo(index)
        this.saveOrUpdateTodo()
      }
    },
    editNo(item){
      this.editTodo = null
      item.content = this.editCache
    },
    updateTodo: function(){
      var dataString = JSON.stringify(this.todoList)
      var todos = AV.Object.createWithoutData('TodoFolder',this.todoId)
      todos.set('todoList',dataString)
      todos.save().then((todo)=>{
      })
    },
    saveTodo(){
      let dataString = JSON.stringify(this.todoList)
      var TodoFolder = AV.Object.extend('TodoFolder')
      var todoFolder = new TodoFolder()
      var acl = new AV.ACL()
      acl.setReadAccess(AV.User.current(),true)
      acl.setWriteAccess(AV.User.current(),true)
      todoFolder.set('todoList',dataString)
      todoFolder.setACL(acl)
      todoFolder.save().then((todo)=> {
        this.todoId = todo.id
      })
    },
    saveOrUpdateTodo(){
      if (this.todoId){
        this.updateTodo()
      } else {
        this.saveTodo()
      }
    },
    receiveCurrentUser(user){
      this.currentUser = user
      var query = new AV.Query('TodoFolder')
      query.find()
        .then((tododata)=>{
          if (tododata){
            var todos = tododata[0]
            this.todoId = todos.id
            this.todoList = JSON.parse(todos.attributes.todoList)
          } else {
            console.log('为空')
          }
        }, function(err){
          console.log(err)
        })
    }
  },
  directives: {
    focus(el,value){
      if(value.value){
        el.focus()
      }
    }
  }
})

function hasChange(){
  let hashname = location.hash.replace(/#\/?/,'')
  if (filters[hashname]){
    app.hashname = hashname
  } else{
    location.hash = ''
    app.hashname = 'all'
  }
}

window.onhashchange = hasChange