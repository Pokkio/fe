<template>
  <div id="recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommend',
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
  #recommend {
    display: flex;
    font-size: 13px;
    padding: 10px 0 20px;
    border-bottom: 10px solid #eee;
  }

  .recommend-item {
    flex: 1;
    text-align: center;
  }

  .recommend-item img {
    width: 80px;
    height: 80px;
    margin-bottom: 5px;
  }
</style>
