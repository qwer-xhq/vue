<template>
  <div id="app">
    <!-- <Student name='张三' sex='男' :age='18'></Student>
    <Student name='李四' sex='女' :age='19'></Student>
    <Student name='王五' sex='男' :age='20'></Student> -->

    <!-- 通过父组件给子组件绑定一个自定义事件，实现自给父传递数据（第一种写法：v-on或@） -->
    <!-- <School @getName='getSchoolName'></School> -->
    <!-- 通过父组件给子组件绑定一个自定义事件，实现自给父传递数据（第二种写法：ref） -->
    <!-- <School ref='school' @click.native="show"></School> -->

    <!-- <Test/> -->

    <button @click="getStudents">获取学生信息</button><br/>
    <button @click="getCars">获取汽车信息</button>
  </div>
</template>

<script>
import axios from 'axios'

import School from './components/School.vue'
import Student from './components/Student.vue'
import Test from './components/Test.vue'
export default {
  name: 'App',
  components: {
    School,
    Student,
    Test
  },
  data(){
    return {
      app:'app'
    }
  },
  methods: {
    getSchoolName(name){
      console.log(name);
    },
    show(){
      alert('123')
    },
    getStudents(){
      axios.get('http://localhost:8081/students/students').then(
        response => {
          console.log('请求成功',response.data);
        },
        error => {
          console.log('请求失败',error.message)
        }
      )
    },
    getCars(){
      axios.get('http://localhost:8081/cars/cars').then(
        response => {
          console.log('请求成功',response.data);
        },
        error => {
          console.log('请求失败',error.message)
        }
      )
    },
  },
  mounted() {
    // setTimeout(() => {

    //   this.$refs.school.$on('getName',this.getSchoolName)
      
    //   // 只触发一次
    //   // this.$refs.school.$once('getName',this.getSchoolName)
    // }, 3000);
  },
}
</script>

<style>

</style>
