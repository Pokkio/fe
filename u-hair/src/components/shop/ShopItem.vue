<template>
  <div class="shop-item">
    <div class="item-head">
      <div class="item-name">{{shop.name}}</div>
      <div class="item-distance"><strong>--</strong></div>
    </div>
    <div class="item-price">吸剪吹
      <div style="display: inline-block; transform: scale(.6); transform-origin: left;">￥</div>{{shop.price}}
    </div>
    <div class="item-now-person">
      <div>{{shop.nowPerson}}人正在剪发</div>
    </div>
    <div class="item-footer">
      <div class="item-addr"><van-icon name="star" />{{shop.addr}}</div>
      <div class="item-btn"><van-button type="danger">去剪发</van-button></div>
    </div>
    
  </div>
</template>

<script>
  export default {
    name: 'ShopItem',
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .shop-item {
    padding: 15px;
    font-size: 17px;
    border-bottom: 1px solid #eee;
    background: #ffffff;

    .item-head {
      display: flex;

      .item-name {
        flex: 1;
        font-weight: 800;
        padding: 5px 0;
      }

      .item-distance {
        width: 30px;
      }
    }

    .item-footer {
      display: flex;

      .item-addr {
        flex: 1;
        line-height: 25px;
        height: 25px;
      }

      .van-button {
        height: 30px;
      }
    }

    .item-price {
      padding: 5px 0;
      font-size: 16px;
    }

    .item-now-person div {
      display: inline-block;
      font-size: 16px;
      transform: scale(0.8);
      transform-origin: left;
      outline: 1px solid #cececd;
      margin-bottom: 5px;
    }
  }
</style>