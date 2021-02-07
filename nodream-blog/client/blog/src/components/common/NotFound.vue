<template>
  <div class="not-found">
    <div class="content">
      <router-link to="/">404 NotFound</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'NotFound'
  }
</script>

<style scoped>
  .not-found {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, .3);
    text-align: center;
    font-size: 0;
    white-space: nowrap;
    overflow: auto;
  }

  .not-found:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }

  .content {
    display: inline-block;
    vertical-align: middle;
    text-align: left;
    font-size: 18px;
    white-space: normal;
  }

  a {
    text-decoration: none;
    color: #000000;
  }
</style>