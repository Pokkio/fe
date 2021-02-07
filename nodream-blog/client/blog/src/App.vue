<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    // 页面刷新关闭前对存在vuex中的数据进行本地存储，打开页面时再读取本地数据
    created() {
      if ( sessionStorage.getItem('store') ) {
        this.$mutations.setColor(JSON.parse(sessionStorage.getItem('store')))
      }
      window.addEventListener('beforeunload', () => {
        sessionStorage.setItem('store', JSON.stringify(this.$mutations.getColor()))
      })
    }
  }
</script>

<style>
  @import url('~assets/css/base.css');
</style>
