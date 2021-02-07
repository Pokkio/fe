<template>
  <current-user v-slot="user">
    {{ user.user.lastName }}
  </current-user>
</template>

<script>
  import CurrentUser from './CurrentUser'

  export default {
    name: 'HelloWorld',
    components: {
      CurrentUser
    }
  }
</script>

<style scoped lang="scss">
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
</style>
