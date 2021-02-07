<template>
  <div class="order">
    <div class="order-head">
      <div class="order-name">我的订单</div>
      <tabs :titles="titles" />
    </div>
    <tab-bar />
  </div>
</template>

<script>
  import TabBar from 'components/TabBar/TabBar'
  import Tabs from 'components/tabs/Tabs'

  export default {
    name: 'Order',

    data() {
      return {
        titles: ['待消费', '服务中', '已完成', '已取消/过号']
      }
    },

    components: {
      TabBar,
      Tabs
    }
  }
</script>

<style lang="scss" scoped>
  .order {
    background: #f7f6f6;
    height: 100vh;

    .order-name {
      background: #fff;
      padding: 10px;
    }
    // .shops-content {
    //   height: calc(100% - 318px);
    //   overflow: hidden;

    //   .shops {
    //     border-top: 1px solid #cececd;
    //   }
    // }
  }
</style>