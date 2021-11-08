<template>
  <ul class="list">
    <transition-group name="todo" appear>
      <TodoItem
        v-for="(todo,index) in todos" 
        :key="todo.id"
        :todo="todo" 
        :id="index" 
      />
    </transition-group>
    
  </ul>
</template>

<script>
  import TodoItem from './TodoItem.vue'

  export default {
    name: 'TodoList',
    components: {
      TodoItem
    },
    props: ['todos'],
    data(){
      return {
        
      }
    },
    methods: {
         
    },
  }
</script>

<style scoped>
  .list{
    padding:0;
    list-style: none;
  }
  
  .todo-enter-active{
    animation: slide 0.7s linear;
  }
  .todo-leave-active{
    animation: slide 0.7s reverse;
  }

  @keyframes slide {
    from{
      transform: translateX(-100%);
    }
    to{
      transform: translateX(0px);
    }
  }
</style>