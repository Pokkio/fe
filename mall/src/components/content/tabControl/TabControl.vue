<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles"
    class="tab-control-item"
    :class="{active: currentIndex===index}"
    @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      defult() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index;
      this.$emit('tabClick', index);
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    padding: 0 4px 4px 6px;
    border-bottom: 3px solid var(--color-tint);
  }
</style>
