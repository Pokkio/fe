<template>
  <div class="car-list">
    <scroll class="content">
      <car-list-item v-for="(item, index) in carList"
      :item-info="item" :key="index" />
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';
  import CarListItem from './CarListItem';
  import { mapGetters } from 'vuex';

  export default {
    name: 'CarList',
    computed: {
      ...mapGetters(['carList'])
    },
    components: {
      Scroll,
      CarListItem
    }
  }
</script>

<style scoped>
  .car-list {
    height: calc(100vh - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>