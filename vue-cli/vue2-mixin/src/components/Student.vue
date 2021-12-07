<template>
  <div>
    <h2 @click="clickTip('学生')">学校：{{school}}</h2>
    <p>学生姓名：{{name}}</p>
    <p>学生性别：{{sex}}</p>
    <p>学生年龄：{{age}}</p>
    <button @click='sendStudentName'>发送姓名给学校</button>
  </div>
</template>

<script>
  import {mixin} from '../mixin.js'
  import pubsub from 'pubsub-js'
  export default {
    name: 'Student',
    data(){
      return {
        school: '内江师范学院'
      }
    },
    props: {
      name:String,
      sex:String,
      age:Number
    },
    mixins: [mixin],

    methods: {
      sendStudentName(){
        //全局事件总线
        // this.$bus.$emit('sendStuName',this.name)

        //消息发布
        pubsub.publish('sendStuName',this.name)
      }
    },
  }
</script>

<style>

</style>