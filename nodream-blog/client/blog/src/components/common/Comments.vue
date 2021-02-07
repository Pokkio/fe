<template>
  <div class="comments"></div>
</template>

<script>
  export default {
    name: 'Comments',
    mounted() {
      new Valine({
        el: '.comments',
        appId: 'CBUqIHlDH5RCCjKd8WGLvdfU-gzGzoHsz',
        appKey: '8J2vf3P9N9KBw45G2BGOW5xa',
        path: window.location.pathname
      })
    },
  }
</script>