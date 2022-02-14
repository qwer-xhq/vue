<template>
  <ul>
    <li>{{a}}</li>
    <li>{{b}}</li>
  </ul>
</template>

<script>
  export default {
    name:'Detail',
    props: ['a','b'],
    mounted() {
      // console.log(this.$route)
    },
  }
</script>

<style>

</style>