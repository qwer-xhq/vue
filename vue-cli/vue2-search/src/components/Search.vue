<template>
  <section class="jumbotron">
    <h3 class="jumbotron-heading">Search Github Users</h3>
    <div>
      <input type="text" placeholder="enter the name you search" v-model.lazy="keyWord"/>&nbsp;
      <button @click="searchUsers">Search</button>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'
  export default {
    name:'Search',
    data(){
      return {
        keyWord:''
      }
    },
    methods:{
      searchUsers(){
        this.$bus.$emit('updataListData',{isFirst:false,isLoading:true,errMsg:'',users:[]})
        axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
          response => {
            this.$bus.$emit('updataListData',{isLoading:false,errMsg:'',users:response.data.items})
          },
          error => {
            this.$bus.$emit('updataListData',{isLoading:false,errMsg:error.message,users:[]})
          }
        )
      }
    }
  }
</script>

<style>

</style>
