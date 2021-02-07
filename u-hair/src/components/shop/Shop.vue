<template>
  <div class="shops">
    <shop-item
      v-for="item in shops"
      :shop="item"
      :key="item['id']" >
    </shop-item>
  </div>
</template>

<script>
  import ShopItem from './ShopItem'

  export default {
    name: 'Shop',

    components: {
      ShopItem
    },

    props: {
      shops: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>