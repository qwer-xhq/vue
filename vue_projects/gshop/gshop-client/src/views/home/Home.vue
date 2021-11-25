<template>
  <div id="home">
    <NavBar class="home-nav" ref="navBar"><template v-slot:center>购物街</template></NavBar>
    <HoverNav :titles="['流行','新款','精选']" @changeType='changeType' v-show="isShowHoverNav" ref="hoverNav1"></HoverNav>
    <Scroll :class="{'content':!isShowHoverNav,'content-change':isShowHoverNav}" ref="scroll" 
      :probeType="3" 
      :pullUpLoad="true" 
      @scroll="scroll" 
      @pullingUp="loadMore"
    >
      <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"></HomeSwiper>
      <RecommendView :recommends="recommends" ref="recommend"></RecommendView>
      <FeatureView></FeatureView>
      <HoverNav :titles="['流行','新款','精选']" @changeType='changeType' v-show="!isShowHoverNav" ref="hoverNav2"></HoverNav>
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
        isShowHoverNav: false,
        timer: null,
        hoverNavoffsetTop: null,
        saveY: 0,
        goodsY: {
          popY: 0,
          newY: 0,
          sellY: 0,
        }
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
            // this.$refs.scroll.refresh()
            this.$refs.scroll.scrollTo(0, this.goodsY.popY, 0)
            break
          case 1:
            this.currentType = 'new'
            // this.$refs.scroll.refresh()
            this.$refs.scroll.scrollTo(0, this.goodsY.newY, 0)
            break
          case 2:
            this.currentType = 'sell'
            // this.$refs.scroll.refresh()
            this.$refs.scroll.scrollTo(0, this.goodsY.sellY, 0)
            break
        }
        this.$refs.hoverNav1.currentIndex = index
        this.$refs.hoverNav2.currentIndex = index
        
      },
      // 返回顶部
      backTop() {
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      // 滚动监听
      scroll(position){
        // 滑动到一定距离显示返回顶部按钮
        this.isShowBackTop = (-position.y) > 1000

        // 判断hoverNav是否吸顶
        this.isShowHoverNav = (-position.y) > (this.hoverNavoffsetTop-this.$refs.navBar.$el.offsetHeight)

        // 调用获取不同类型页面位置方法
        this.getGoodsTypePos(position)
        
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
      swiperImageLoad(){
        this.hoverNavoffsetTop = this.$refs.hoverNav2.$el.offsetTop
        // 不同类型商品页位置赋初始值
        for(let item in this.goodsY){
          this.goodsY[item] = -this.hoverNavoffsetTop
        }
      },

      // 记录不同类型页面位置
      goodsTypePos(position){
        if(position.y<-this.hoverNavoffsetTop){
          switch(this.currentType) {
            case 'pop':
              this.goodsY.popY = position.y
              break
            case 'new':
              this.goodsY.newY = position.y
              break
            case 'sell':
              this.goodsY.sellY = position.y
              break
          }
        }
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
      console.log('Home mounted');
      const refresh = debounce(this.$refs.scroll.refresh,200)
      this.$root.$on('goodsImageLoad',() => {
        refresh()
      })
      // 防抖获取不同类型页面位置
      this.getGoodsTypePos = debounce(this.goodsTypePos,20)
    },
    activated() {
      console.log('activated');
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      console.log('deactivated');
      switch(this.currentType) {
        case 'pop':
          this.saveY = this.goodsY.popY
          break
        case 'new':
          this.saveY = this.goodsY.newY
          break
        case 'sell':
          this.saveY = this.goodsY.sellY
          break
      }
    },
    beforeDestroy() {
      console.log('Home beforeDestroy');
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
  .content-change {
    height: calc(100% - 40px);
    overflow: hidden;
  }
</style>
