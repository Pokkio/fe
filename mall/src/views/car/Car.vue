<template>
  <div class="car">
    <nav-bar class="navbar">
      <div slot="center">购物车({{carLength}})</div>
    </nav-bar>
    <car-list />
    <car-bottom-bar></car-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';
  import CarList from './childComps/CarList';
  import CarBottomBar from './childComps/CarBottomBar';
  import { mapGetters } from 'vuex';

  export default {
    name: 'Car',
    components: {
      NavBar,
      CarList,
      CarBottomBar
    },
    computed: {
      ...mapGetters(['carLength'])
    }
  }
</script>

<style scoped>
  .navbar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 500;
    position: relative;
    z-index: 1;
  }
</style>
