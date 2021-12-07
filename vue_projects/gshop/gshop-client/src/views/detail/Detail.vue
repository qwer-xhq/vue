<template>
  <div class="goods-detail">
    <DetailNavBar />
    <Scroll class="detail-scroll" ref="scroll" :bounce="false">
      <DetailSwiper :topImages="topImages"/>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="detailIamgeLoad"></DetailGoodsInfo>
      <DetailParamInfo :paramInfo="paramInfo"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo"></DetailCommentInfo>
      <GoodsList :goods="recommends"></GoodsList>
    </Scroll>
    
  </div>
</template>

<script>
  import {getDetail,getRecommend,Goods,Shop,GoodsParam} from 'network/detail.js'
  import {itemListenerMixin} from '@/common/mixin.js'

  import Scroll from 'components/common/scroll/Scroll'
  import Toast from 'components/common/toast/Toast'

  import GoodsList from 'components/content/goods/GoodsList'

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  // import DetailBottomBar from './childComps/DetailBottomBar'
  // import CartButton from './childComps/CartButton'

  export default {
    name: 'Detail',
    components: {
      Scroll,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
	    GoodsList,
      // DetailBottomBar,
      // CartButton,
      Scroll,
      Toast
    },
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        goodsList: [],
        themeTops: [],
        recommends: [],
        currentIndex: 0
      }
    },
    methods: {
      detailIamgeLoad() {
        console.log('detail图片加载完刷新');
        this.$refs.scroll.refresh()
      }
    },
    mixins: [itemListenerMixin],
    created() {
      this.iid = this.$route.params.id
      // 获取商品信息
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        // 1.保存顶部轮播图信息
        this.topImages = data.itemInfo.topImages

        // 2.保存商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

        // 3.保存店铺信息
        this.shop = new Shop(data.shopInfo)

        // 4.保存商品信息的详细数据
        this.detailInfo = data.detailInfo

        // 5.保存参数信息
        this.paramInfo = new GoodsParam(data.itemParams)

        // 6.保存评论数据
        if (data.rate.list) { // 判断是否有评论信息
          this.commentInfo = data.rate.list[0];
        }
      })
      // 获取推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted() {
      
    },
    beforeDestroy() {
      this.$root.$off('goodsImageLoad')
    },
  }
</script>

<style scoped>
  .goods-detail {
    height: 100vh;
    position: relative;
    z-index: 3;
    background: #fff;
  }
  .detail-scroll {
    height: calc(100% - 93px);
    overflow: hidden;
  }
</style>