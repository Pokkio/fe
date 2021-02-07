<template>
  <span>
    <slot v-bind:user="user">
      {{ user.lastName }}
    </slot>
  </span>
</template>

<script>
  export default {
    name: 'CurrentUser',
    data() {
      return {
        user: {
          lastName: 'lastName',
          firstName: 'firstName'
        }
      }
    }
  }
</script>

<style>

</style>