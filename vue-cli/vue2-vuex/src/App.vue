<template>
  <div id="app">
    <ul class="category">
      <router-link tag="li" to="/count">计数</router-link>
      <router-link tag="li" to="/person">人员列表</router-link>
    </ul>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Count from './components/Count'
import Person from './components/Person'

export default {
  name: 'App',
  components: {
    Count,
    Person
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }
  button{
    margin-left: 5px;
  }
  ul{
    list-style: none;
  }
  #app{
    display: flex;
    margin: 20px 0 0 20px;
  }
  .category{
    margin-right: 10px;
    /* border:2px solid black; */
    background-color: pink;
  }
  .category li{
    margin-top: 5px;
    background-color: #fff;
    cursor: pointer;
  }
  .category li:hover{
    background-color: #eee;
  }
</style>
