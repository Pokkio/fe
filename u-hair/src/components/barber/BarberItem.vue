<template>
  <div class="barber-item" v-if="barber.last">
    <div class="avatar">
      <img src="../../assets/img/card/avatar.png">
      <div>手艺值 {{barber.point}}</div>
    </div>
    <div class="barber">
      <div class="barber-name">{{barber.name}}</div>
      <div class="barber-price">￥{{barber.price}}</div>
      <div class="barber-person" v-if="barber.person">
        <van-icon
          name="fire-o"
          v-for="i in barber.person"
          :key="i" />
      </div>
      <div class="wait">前面有{{barber.person}}人，约等待{{waitTime}}分钟 >></div>
    </div>
    <div class="go-to-cut"><van-button type="danger">取号</van-button></div>
    <div class="close" @click="barber.last = !barber.last">
      <img src="../../assets/img/card/x.png">
    </div>
    <div class="show-last" v-if="barber.last">
      <span>上次光顾</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'BarberItem',
    props: {
      barber: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    
    computed: {
      waitTime() {
        return this.barber.person * 30;
      }
    },

    methods: {
    }
  }
</script>

<style lang="scss" scoped>
  .barber-item {
    margin: 10px;
    background: #ffffff;
    display: flex;
    margin-top: 20px;
    font-size: 16px;
    position: relative;
    box-shadow: 0px 3px 4px 2px #eee;
    border-radius: 4px;
    padding: 10px 0;

    .avatar {
      padding: 10px;
      text-align: center;

      img {
        height: 45px;
        padding: 10px;
        border-bottom: 2px solid #000;
      }

      div {
        transform: scale(0.8);
      }
    }

    .barber {

      .barber-name {
        padding: 5px 0;
        font-weight: 800;
      }

      .barber-price {
        color: red;
        padding-bottom: 10px;
      }

      .wait {
        transform: scale(0.8);
        transform-origin: left;
        color: rgb(201, 197, 197);
      }
    }

    .go-to-cut {
      display: flex;
      align-items: center;

      .van-button {
        width: 80px;
      }
    }

    .close {
      position: absolute;
      right: 0;
      top: 0;
    }

    .show-last {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 12px;
      transform: scale(0.8);
      transform-origin: left;

      span {
        display: inline-block;
        background: #000;
        color: #fff;
        padding: 3px 5px;
        background: linear-gradient(120deg, transparent 10px, #000 0) right
      }
    }
  }
</style>