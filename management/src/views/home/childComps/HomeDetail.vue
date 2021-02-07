<template>
  <div class="home-detail">
    <v-header />
    {{content}}
  </div>
</template>

<script>
  import Header from 'components/content/Header';
  import { connent } from 'network/banner';

  export default {
    name: 'HomeDetail',
    data() {
      return {
        content: null
      }
    },
    components: {
      'v-header': Header
    },
    mounted() {
      connent(this.$route.params.id).then((res) => {
        if (res.data.code == 1) {
          this.content = res.data.data.content;
        } else {
          this.$notify({title: '数据获取超时'});
        }
      });
    }
  }
</script>

<style scoped>

</style>