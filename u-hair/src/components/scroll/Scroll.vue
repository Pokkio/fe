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
        default() {
          return 0
        }
      }
    },

    data() {
      return {
        scroll: null
      }
    },

    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        probeType: this.probeType
      })

      // 监听滚动位置
      if ( this.probeType === 2 || this.probeType === 3 ) {
        this.scroll.on('sroll', ( position ) => {
          this.$emit('scrollPosition', position)
        })
      }

      // 监听滚动到底部事件
      this.scroll.on('pullingUp', () => {
        this.$emit('loadMore')
      })
    },

    methods: {
      // 滚动到指定的位置
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      // 数据已加载
      finishPullUp() {
        this.scroll.finishPullUp();
      },
      // 
      refresh() {
        this.scroll.refresh();
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>