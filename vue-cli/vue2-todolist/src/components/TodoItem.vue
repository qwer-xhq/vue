<template>
    <li class="item">
      <div class="todo">
        <input type="checkbox" :checked="todo.complete" @change="changeComplete()">
        <span v-show="!todo.isEdit">{{todo.option}}</span>
        <input 
          type="text" 
          :value="todo.option"  
          v-show="todo.isEdit"
          @blur="handBlur($event,todo)"
          ref="inputOption"
        >
      </div>
      <div class="todo-btn">
        <button class="btn btn-edit" v-show="!todo.isEdit" @click="handleEdit(todo)">编辑</button>
        <button class="btn btn-denger" @click="delTodo()">删除</button>
      </div>
      
    </li> 
</template>

<script>
export default {
  name: 'TodoItem',
  props: ['todo','id'],
  data(){
    return　{
    
    }
  },
  methods: {
    changeComplete(){
      this.$bus.$emit('checkTodo',this.id)
    },
    delTodo(){
      this.$bus.$emit('delTodo', this.id)
    },
    handleEdit(todo){
      if('isEdit' in todo){
        todo.isEdit=true
      }else{
        console.log('isEdit');
        this.$set(todo,'isEdit',true)
      }
      this.$nextTick(function(){
        console.log(this);
        this.$refs.inputOption.focus()
      })
    },
    handBlur(e,todo){
      todo.isEdit=false
      if(!e.target.value) return alert('输入不能为空')
      this.$bus.$emit('updateTodo',this.id,e.target.value)
    }
  },
}
</script>

<style scoped>
  .item{
    height: 30px;
    background-color: aqua;
    border-bottom: 2px solid black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    

  }
  .todo-btn{
    display: flex;
  }
  .btn{
    margin-left: 10px;
    /* background-color: red; */
    display: none;
    
  }
  .item:hover button{
    display: block;
  }

  
</style>