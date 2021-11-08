<template>
  <div class="header">
    <input type="text" placeholder="请输入你的任务名称，按回车键确认" @keyup.enter="add">
  </div>
</template>

<script>
import {nanoid} from 'nanoid'
export default {
  name: 'TodoHeader',
  // props: ['addTodo'],
  methods: {
    add(e){
      if(!e.target.value.trim()) return alert('输入不能为空！')
      // this.addTodo({name:nanoid(),option:e.target.value,complete:false})
      this.$emit('addTodo', {id:nanoid(),option:e.target.value,complete:false})
      e.target.value=''
    }
  }
}
</script>

<style scoped>
  .header>input{
    width: 392px;
  }
</style>