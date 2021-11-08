<template>
  <div>
    <h2 @click="clickTip('学校')">学校名称：{{name}}</h2>
    <h2>学校地址：{{address}}</h2>
    <button @click="sendName">点击传值给父组件</button>
  </div>
</template>

<script>
  //混合文件导入
  import {mixin} from '../mixin.js'
  //消息订阅预发布文件导入
  import pubsub from 'pubsub-js'
  export default {
    name: 'School',
    data(){
      return {
        name: '内江师范学院',
        address: '内江'
      }
    },
    /* 
    * 混合配置，把多个组件共用的配置提取成一个混入对象
    * 全局使用：Vue.mixin(xxx)
    * 局部使用：mixins:[xxx] 
    */
    mixins: [mixin],

    methods: {
      sendName(){
        this.$emit('getName',this.name)
        // this.$emit('click')
      }
    },
    mounted() {
      //事件绑定
      // this.$bus.$on('sendStuName',(data)=>{
      //   console.log('学校收到了学生姓名',data)
      // })

      //消息订阅
      this.pubId = pubsub.subscribe('sendStuName',(msgName,data)=>{
        console.log('学校收到了学生姓名',data)
      })
    },
    beforeDestroy() {
      //事件解绑
      // this.$bus.$off('sendStuName')
      //取消订阅
      pubsub.unsubscribe(this.pubId)
    },

  }
</script>

<style>

</style>