<template>
  <div id="app">
    <TodoHeader @addTodo="addTodo"/>
    <TodoList
      :todos="todoList"
    />
    <TodoFooter 
      :todos="todoList"  
      @checkAll="checkAll" 
      @delCheckAll="delCheckAll"
    />
  </div>
</template>

<script>
  import TodoHeader from './components/TodoHeader.vue'
  import TodoList from './components/TodoList.vue'
  import TodoFooter from './components/TodoFooter.vue'

  export default {
    name: 'App',
    components: {
      TodoHeader,
      TodoList,
      TodoFooter
    },
    data(){
      return {
        todoList: JSON.parse(localStorage.getItem('todoList')) || [],
      }
    },
    methods: {
      checkTodo(n){
        this.todoList[n].complete=!this.todoList[n].complete;
      },
      addTodo(val){
        console.log('add');
        this.todoList.unshift(val)
      },
      updateTodo(n,val){
        console.log('update');
        this.todoList[n].option=val
      },
      delTodo(n){
        console.log('del');
        this.todoList.splice(n,1)
      },
      checkAll(val){
        this.todoList.forEach(todo => {
          todo.complete = val
        });
      },
      delCheckAll(){
        for(let n=0;n<this.todoList.length;n++){
          if(this.todoList[n].complete){
            this.todoList.splice(n,1)
            n--
          }
        }
      }
    },
    watch:{
      todoList: {
        deep: true,
        handler(val){
          localStorage.setItem('todoList',JSON.stringify(val))
        }
      }
    },
    mounted() {
      this.$bus.$on('checkTodo',this.checkTodo)
      this.$bus.$on('updateTodo',this.updateTodo)
      this.$bus.$on('delTodo',this.delTodo)
    },
    beforeDestroy() {
      this.$bus.$off('checkTodo')
      this.$bus.$off('updateTodo')
      this.$bus.$off('delTodo')
    },
  }
</script>

<style>
  #app {
    width: 400px;
    height: 500px;
    background-color: #f5f5f5;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    margin: 0 auto;
  }
  .btn-denger{
    background-color: red;
  }
  .btn-edit{
    background-color: yellow;
  }
</style>
