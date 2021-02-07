<template>
  <div class="category">
    <nav-bar>
    <div slot="center">商品分类</div>
    </nav-bar>
    <div class="c">
      <cate-left-list />
      <cate-right-list />
    </div>
  </div>
  
</template>

<script>
  import BScroll from 'better-scroll';

  import NavBar from 'components/common/navbar/NavBar';
  import CateLeftList from './childComps/CateLeftList';
  import CateRightList from './childComps/CateRightList';

  export default {
    name: "Category",
    components: {
      NavBar,
      CateLeftList,
      CateRightList
    }
  }
</script>

<style scoped>
  .nav-bar {
    color: #fff;
    font-weight: 600;
    background-color: var(--color-tint);
  }

  .c {
    display: flex;
  }

  .left {
    flex: .5;
  }

  .right {
    flex: 2;
  }

</style>
