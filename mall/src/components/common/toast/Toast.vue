<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'Toast',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message, duration=2000) {
        this.isShow = true;
        this.message = message;
        setTimeout(() => {
          this.isShow = false;
          this.message = '';
        }, duration)
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .7);
    z-index: 2;
    border-radius: 5px;
    color: #fff;
    font-size: 19px;
    padding: 5px 10px;
  }
</style>