<template>
  <tab-bar>
    <tab-bar-item path="/home" activeColor="blue">
      <img src="~assets/img/tabbar/home.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/home_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">首页</div>
    </tab-bar-item>

    <tab-bar-item path="/category" activeColor="blue">
      <img src="~assets/img/tabbar/category.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/category_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">分类</div>
    </tab-bar-item>

    <tab-bar-item path="/car" activeColor="blue">
      <img src="~assets/img/tabbar/shopcar.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/shopcar_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">购物车</div>
    </tab-bar-item>

    <tab-bar-item path="/profile" activeColor="blue">
      <img src="~assets/img/tabbar/profile.svg" alt="" slot="item-icon">
      <img src="~assets/img/tabbar/profile_active.svg" alt="" slot="item-icon-active">
      <div slot="item-text">档案</div>
    </tab-bar-item>
  </tab-bar>
</template>
<script>
import TabBar from 'components/common/tarbar/TabBar'
import TabBarItem from 'components/common/tarbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>

</style>
