<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,
      }
    },
    methods: {
      // 滚动到指定位置
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh(){
        
        this.scroll && this.scroll.refresh()
      }
    },
    created() {
      this.$nextTick(() => {
        // 创建better-scroll对象
        this.scroll = new BScroll(this.$refs.wrapper,{
          probeType: this.probeType,
          // observeDOM: true,
          // observeImage: true, //页面图片加载完成在执行refresh
          click: true,
          mouseWheel: true,
          pullUpLoad: this.pullUpLoad
        })
        // 监听滚动位置
        this.scroll.on('scroll', position => {
          this.$emit('scroll',position)
        })
        // 监听上拉事件
        this.scroll.on('scrollEnd',() => {  // 监听pullingUp事件，需要将pullUpLoad属性设为true才能监听，监听scrollEnd不用设置
          console.log('scroll.y=',this.scroll.y);
          console.log('maxScrollY=',this.scroll.maxScrollY);
          if(this.scroll.y <= (this.scroll.maxScrollY + 50)){
            console.log('上拉');
            this.$emit('pullingUp')
            // this.scroll.finishPullUp() // 完成上拉动作，设置下次上拉不起效果,scrollEnd不用设置
          }
          
        })
      })
    },
    mounted() {
      
    },
  }
</script>

<style scoped>

</style>