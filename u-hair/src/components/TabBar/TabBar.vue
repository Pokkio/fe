<template>
  <div class="tabbar">
    <van-tabbar
      v-model="active"
      active-color="#000000"
      inactive-color="#d1d0d0"
      @change="clickTabbar">
      <van-tabbar-item
        class="tabbar-item">
        <van-icon name="play" />
        剪发</van-tabbar-item>
      <van-tabbar-item>
        <van-icon name="pause" />
        订单</van-tabbar-item>
      <van-tabbar-item>
        <van-icon name="stop" />
        我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  export default {
    name: 'TabBar',

    data() {
      return {
        active: 0
      }
    },

    methods: {
      clickTabbar(index) {
        switch (index) {
          case 0:
            this.$router.push('/cut')
            this.active = index
            break
          case 1:
            this.$router.push('/order')
            this.active = index
            break
          case 2:
            this.$router.push('/profile')
            this.active = index
            break
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .van-tabbar-item {

    height: 50px;
    font-size: 17px;

    .van-icon {
      text-align: center;
      display: block;
    }
  }
</style>