<template>
  <swiper>
    <swiper-item v-for="(item, index) in banner" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="swiperLoad">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper';

export default {
  name: 'HomeSwiper',
  data() {
    return {
      isImageLoad: false
    }
  },
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    // 加载多张轮播图时只发射一次该事件
    swiperLoad() {
      if (!this.isImageLoad) {
        this.$emit('swiperLoad');
        this.isImageLoad = true;
      }
    }
  }
}
</script>

<style scoped>

</style>
