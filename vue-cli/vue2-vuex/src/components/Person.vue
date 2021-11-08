<template>
  <div>
    <h1>人员列表</h1>
    <input type="text" placeholder="请输入名字" v-model.lazy="person">
    <button @click="addPerson">添加</button>
    <button @click="addPersonWang">添加一个姓王的人</button>
    <h3>列表的一个名字是：{{firstListName}}</h3>
    <ul>
      <li v-for="p in personList" :key="p.id">{{p.name}} {{p.description}}</li>
    </ul>
  </div>
</template>

<script>
  import {nanoid} from 'nanoid'
  export default {
    name:'Person',
    data(){
      return {
        person:''
      }
    },
    methods: {
      addPerson(){
        this.$store.dispatch('personOptions/addPerson',{id:nanoid(),name:this.person})
        this.person=''
      },
      addPersonWang(){
        this.$store.dispatch('personOptions/addPersonWang',{id:nanoid(),name:this.person})
        this.person=''
      }
    },
    computed:{
      personList(){
        return this.$store.state.personOptions.personList
      },
      firstListName(){
        return this.$store.getters['personOptions/firstListName']
      }
    }
  }
</script>

<style scoped>

</style>