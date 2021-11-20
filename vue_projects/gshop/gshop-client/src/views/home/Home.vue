<template>
  <div id="home">
    <NavBar class="home-nav"><template v-slot:center>购物街</template></NavBar>
    <Scroll class="content">
      <HomeSwiper :banners="banners"></HomeSwiper>
      <RecommendView :recommends="recommends"></RecommendView>
      <FeatureView></FeatureView>
      <HoverNav class="hover-nav" :titles="['流行','新款','精选']" @changeType='changeType'></HoverNav>
      <GoodsList :goods="showGoods"></GoodsList>
    </Scroll>
    
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'

  import HoverNav from 'components/content/hoverNav/HoverNav'
  import GoodsList from 'components/content/goods/GoodsList'

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
      Scroll
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
        currentType:'pop'
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

      /**
       * 网络请求相关方法
       */
      getHomeMultidata(){
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type){
        const page = this.goods[type].page+1
        getHomeGoods(type,page).then(res => {
          // console.log(res);
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
    }
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
  .hover-nav{
    position: sticky;
    top: 44px
  }
  .content {
    height: calc(100%);
    overflow: hidden;
  }
</style>
