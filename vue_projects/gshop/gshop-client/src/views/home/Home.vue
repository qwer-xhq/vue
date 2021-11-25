<template>
  <div id="home">
    <NavBar class="home-nav"><template v-slot:center>购物街</template></NavBar>
    <HoverNav class="hover-nav" :titles="['流行','新款','精选']" @changeType='changeType' v-show="!isShowHoverNav"></HoverNav>
    <Scroll class="content" ref="scroll" 
      :probeType="3" 
      :pullUpLoad="true" 
      @scroll="scroll" 
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <HoverNav :titles="['流行','新款','精选']" @changeType='changeType' v-show="isShowHoverNav"></HoverNav>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backTop" v-show="isShowBackTop"></BackTop>
  </div>
</template>

<script>
  import {debounce} from '@/common/utils.js'

  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import HoverNav from 'components/content/hoverNav/HoverNav'
  import GoodsList from 'components/content/goods/GoodsList'
  import BackTop from 'components/content/backTop/BackTop'

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView"

  import {getHomeMultidata, getHomeGoods} from "network/home";

  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      HoverNav,
      GoodsList,
      Scroll,
      BackTop,
    },
    data(){
      return {
        banners:[],
        recommends:[],
        goods:{
          pop: {page: 0, list:[]},
          new: {page: 0, list:[]},
          sell: {page: 0, list:[]}
        },
        currentType:'pop',
        isShowBackTop: false,
        isShowHoverNav: true,
        timer: null
      }
    },
    computed: {
      showGoods(){
        return this.goods[this.currentType].list
      }
    },
    methods: {
      /**
       * 事件监听相关方法
       */
      // 切换不同类型数据
      changeType(index){
        switch(index){
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      // 返回顶部
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      // 滚动监听
      scroll(position){
        if(position.y<-1000){
          this.isShowBackTop=true
        }else{
          this.isShowBackTop=false
        }
        this.isShowHoverNav = position.y>-673
      },
      // 加载更多数据
      loadMore(){
        // 解决快速频繁上拉刷新
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          console.log('加载更多');
          this.getHomeGoods(this.currentType)
        }, 500);
      },
      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page=page
        })
      },

    },
    created() {
      this.getHomeMultidata()

      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      const refresh = debounce(this.$refs.scroll.refresh,100)
      this.$root.$on('goodsImageLoad',() => {
        refresh()
      })
    },
    beforeDestroy() {
      this.$root.$off('goodsImageLoad')
    },
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    padding-bottom: 49px;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
  .content {
    height: calc(100%);
    overflow: hidden;
  }
</style>
