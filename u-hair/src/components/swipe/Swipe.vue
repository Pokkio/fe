<template>
  <div class="banners">
    <van-swipe
      :autoplay="3000"
      indicator-color="white">

      <van-swipe-item
        v-for="item in banners"
        :key="item['id']">
        <img :src="item['img']">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: 'Swipe',
    data() {
      return {
        banners: [
          {
            id: 1,
            img: require('@/assets/img/banners/banner1.jpg')
          },
          {
            id: 2,
            img: require('@/assets/img/banners/banner2.jpg')
          },
          {
            id: 3,
            img: require('@/assets/img/banners/banner3.jpg')
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .van-swipe-item img {
    width: 100%;
    height: 300px;
  }
</style>