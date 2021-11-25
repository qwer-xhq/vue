<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="" @load="imageLoad">
    <div>
      <p>{{goodsItem.title}}</p>
      <p>
        <span>{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </p>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$nextTick(() => {
          this.$root.$emit('goodsImageLoad')
        })
        
      }
    },
    mounted() {
      
    },
  }
</script>

<style scoped>
  .goods-item {
    width: 45%;
    height: 300px;
  }
  .goods-item img {
    width: 100%;
    height: 85%;
    border-radius: 10px;
  }
  .goods-item>div>p:nth-child(1){
    height: 22px;
    line-height: 22px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-item>div>p:nth-child(2)>span:nth-child(1){
    color: var(--color-tint);
  }
  .goods-item .collect::before {
    display: inline-block;
    content: '';
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>