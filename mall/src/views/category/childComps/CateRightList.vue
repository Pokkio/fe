<template>
  <div class="right">
    <scroll class="right-content">
      <div class="right-item" v-for="(item, index) in itemInfos">
        <img src="~assets/img/common/placeholder.png" class="right-item-img" />
        <span class="right-item-name">{{item}}</span>
      </div>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';

  export default {
    name: 'CateRightList',
    data() {
      return {
        itemInfos: ['分类1', '分类2', '分类3', '分类4', '分类5',
                    '分类6', '分类7', '分类8', '分类9', '分类10',
                    '分类11', '分类12', '分类13', '分类14', '分类15']
      }
    },
    components: {
      Scroll,
    }
  }
</script>

<style scoped>
  .right {
    height: calc(100vh - 44px - 49px);
    padding: 20px 0 0 20px;
  }

  .right-content {
    height: 100%;
    overflow: hidden;
  }

  .right-item {
    font-size: 16px;
    margin-right: 20px;
    display: inline-block;
  }

  .right-item img {
    height: 80px;
    width: 80px;
  }

  .right-item span {
    display: block;
    margin-bottom: 8px;
    text-align: center;
  }
</style>