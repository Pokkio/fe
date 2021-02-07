<template>
  <div class="left">
    <scroll class="left-content">
      <ul class="left-items">
        <li v-for="(item, index) in groups" class="left-item"
        :class="{active: currentIndex === index}"
        @click="itemClick(index)">{{item}}</li>
      </ul>
    </scroll>
  </div>
</template>

<script>
  import Scroll from 'components/common/scroll/Scroll';

  export default {
    name: 'CateLeftList',
    data() {
      return {
        groups: ['流行', '上衣', '裤子', '裙子', '内衣', '女鞋',
                 '男鞋', '包包', '运动', '配饰', '美妆', '个护', '家居',
                 '电子', '游戏', '户外'],
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
      }
    },
    components: {
      Scroll,
    }
  }
</script>

<style scoped>
  .left {
    height: calc(100vh - 44px - 49px);
  }

  .left-content {
    height: 100%;
    overflow: hidden;
  }

  .left-items {
    font-size: 15px;
  }

  .left-item {
    padding: 12px 20px;
    text-align: center;
    background-color: #f0f0f0;
  }

  .active {
    color: var(--color-tint);
    border-left: 3px solid var(--color-high-text);
    background-color: #fff;
  }
</style>
