<template>
  <div>
    <ul>
      <li v-for="m in messageList" :key="m.id">
        <!-- 跳转路由并携带params参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail/${m.id}/${m.title}`">{{m.title}}</router-link> -->

        <!-- 跳转路由并携带params参数，to的对象写法 -->
        <router-link :to="{
          //path:`/home/message/detail/${m.id}/${m.title}`,
          name:'Detail',  //使用params携带参数，必须使用name配置作为跳转路径
          params: {
            id: m.id,
            title: m.title
          }
        }">
          {{m.title}}
        </router-link>


        <!-- 跳转路由并携带query参数，to的字符串写法 -->
        <!-- <router-link :to="`/home/message/detail?id=${m.id}&title=${m.title}`">{{m.title}}</router-link> -->

        <!-- 跳转路由并携带query参数，to的对象写法 -->
        <!-- <router-link :to="{
          //path:'/home/message/detail',
          name:'detail',
          query: {
            id: m.id,
            title: m.title
          }
        }">
          {{m.title}}
        </router-link> -->

        <button @click="pushShow(m)">push查看</button>
        <button @click="replaceShow(m)">replace查看</button>
      </li>
    </ul>
    <hr/>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name:'HomeMessage',
    data(){
      return {
        messageList: [
          {id:'001',title:"消息001"},
          {id:'002',title:"消息002"},
          {id:'003',title:"消息003"}
        ]
      }
    },
    methods: {
      pushShow(m){
        this.$router.push({
          name:'Detail',  //使用params携带参数，必须使用name配置作为跳转路径
          params: {
            id: m.id,
            title: m.title
          }
        }).catch(err=>err)
      },
      replaceShow(m){
        this.$router.replace({
          name:'Detail',  //使用params携带参数，必须使用name配置作为跳转路径
          params: {
            id: m.id,
            title: m.title
          }
        }).catch(err=>err)
      }
    },
  }
</script>

<style>

</style>