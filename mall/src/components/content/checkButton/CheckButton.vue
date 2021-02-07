<template>
  <div class="check-button" :class="{check: isCheck}">
    <img src="~assets/img/car/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isCheck: {
        type: Boolean,
        default() {
          return true
        }
      }
    }
  }
</script>

<style scoped>
  .check-button {
    border-radius: 50%;
    border: 2px solid #eee;
  }

  .check {
    background-color: var(--color-tint);
    border: 2px solid var(--color-tint);
  }
</style>