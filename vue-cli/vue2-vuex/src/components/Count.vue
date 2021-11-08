<template>
  <div>
    <h1>当前求和为：{{sum}}</h1>
    <h3>当前求和放大十倍为：{{bigSum}}</h3>
    <h3>我在{{school}}学习{{object}}</h3>
    <h3>person组件的总人数是：{{personList.length}}</h3>
    <select v-model="n">
      <option :value="1">1</option>
      <option :value="2">2</option>
      <option :value="3">3</option>
    </select>
    <button @click="decrement(n)">-</button>
    <button @click="increment">+</button>
    <button @click="incrementOdd">当前求和为奇数再加</button>
    <button @click="incrementWait(n)">等一等再加</button>
  </div>
</template>

<script>
  import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
  export default {
    name:'Count',
    data() {
      return {
        n:1
      }
    },
    computed: {
      ...mapState('countOptions',['sum','school','object']),
      ...mapState('personOptions',['personList']),
      ...mapGetters('countOptions',['bigSum'])
    },
    methods: {
      increment(){
        this.$store.commit('countOptions/INCREMENT',this.n)
      },
      ...mapMutations('countOptions',{decrement:'DECREMENT'}),
      // decrement(){
      //   this.$store.commit('DECREMENT',this.n)
      // },

      incrementOdd(){
        this.$store.dispatch('countOptions/incrementOdd',this.n)
      },
      ...mapActions('countOptions',['incrementWait'])
      // incrementWait(){
      //   this.$store.dispatch('incrementWait',this.n)
      // },
    },
    mounted() {
      console.log(this.$store);
    },
  }
</script>

<style scoped>
  
</style>