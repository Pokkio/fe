<template>
  <div class="pos">
    <left-nav />
    <div class="main">
      <order />
    </div>
  </div>
</template>

<script>
  import LeftNav from 'components/common/LeftNav';
  import Order from './childComps/Order';

  export default {
    name: 'Pos',
    components: {
      LeftNav,
      Order,
    }
  }
</script>

<style>
  .main {
    float: left;
    width: 96%;
    background-color: #EFF2F7;
    height: 100vh;
  }
</style>