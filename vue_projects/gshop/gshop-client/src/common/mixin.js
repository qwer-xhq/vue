import {debounce} from './utils.js'

export const itemListenerMixin = {
  mounted() {
    console.log('mixin');
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.$root.$on('goodsImageLoad',() => {
      refresh()
    })
  },
}