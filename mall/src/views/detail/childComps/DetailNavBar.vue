<template>
  <nav-bar class="detail-nav-bar">
    <div slot="left" class="back" @click="backClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="title">
      <div v-for="(item, index) in titles"
      class="title-item" :class="{active: currentIndex === index}"
      @click="titleClick(index)">{{item}}</div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    name: 'DetailNavBar',
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        currentIndex: 0
      }
    },
    components: {
      NavBar
    },
    methods: {
      titleClick(index) {
        this.currentIndex = index;
        this.$emit('titleClick', index);
      },
      backClick(){
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .detail-nav-bar {
    border-bottom: 1px solid #eee;
  }

  .title {
    display: flex;
    font-size: 15px;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }

  .back img {
    margin-top: 12px;
  }
</style>