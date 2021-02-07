<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" @load="imageLoaded">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImage() {
        return this.goodsItem.image || this.goodsItem.show.img;
      }
    },
    methods: {
      imageLoaded() {
        this.$bus.$emit('itemImageLoaded');
      },
      itemClick() {
        this.$router.push('/detail/' + this.goodsItem.iid);
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 43%;
    margin: 0 10px 20px 15px;
    float: left;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 14px;
    text-align: center;
  }
  
  .goods-item p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-item .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-item .collect {
    position: relative;
  }

  .goods-item .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: 1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
