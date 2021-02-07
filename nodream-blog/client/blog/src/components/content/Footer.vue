<template>
  <div class="footer">
    <p>Copyright ©️ 
      <a 
        href="https://github.com/Pokkio"
        :style="{ color: isSelectColor }"
      >落日冲浪手</a>
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Footer',
    data() {
      return { 
      }
    },
    computed: {
      isSelectColor() {
        return this.$mutations.getColor()
      }
    }
  }
</script>

<style scoped>
  .footer {
    font-size: 13px;
  }

  a {
    text-decoration: none;
  }
</style>