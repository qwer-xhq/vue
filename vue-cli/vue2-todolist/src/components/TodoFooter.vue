<template>
  <div class="footer" v-show="todos.length">
    <input type="checkbox" :checked="isCheckAll" @change="checkAllTodo" />
    <span>已完成{{compNum}}/全部{{todos.length}}</span>
    <button v-show="compNum" @click="delCheckAll">删除选中</button>
  </div>
</template>

<script>
export default {
  name: 'TodoFooter',
  data(){
    return {
      
    }
  },
  // props: ['todos','isCheckAll','checkAll','delCheckAll'],
  props: ['todos'],
  methods: {
    checkAllTodo(e){
      // this.checkAll(e.target.checked)
      this.$emit('checkAll',e.target.checked)
    },
    delCheckAll(){
      this.$emit('delCheckAll');
    },
  },
  computed:{
    isCheckAll(){
      return this.todos.filter(todo => todo.complete).length==this.todos.length && this.todos.length>0
    },
    compNum(){
      return this.todos.filter(todo=>todo.complete).length
    }
  },
  mounted() {
    // console.log(this)
  },
}
</script>

<style>
  .footer>button{
    margin-left: 30px;
  }
</style>