<template>
  <div class="tabs">
    <van-tabs
      v-model="active"
      swipeable>
      <van-tab
        v-for="item in titles"
        :title="item"
        :key="item"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
  export default {
    name: 'Tabs',

    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },

    data() {
      return {
        active: 0
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>