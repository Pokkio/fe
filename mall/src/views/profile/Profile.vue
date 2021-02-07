<template>
  <div id="profile">
    <nav-bar>
      <div slot="center">我的档案</div>
    </nav-bar>
    <div class="info">
      <img src="~assets/img/common/placeholder.png" alt="">
      <div class="login-register">
        <span>登录</span><span>/</span><span>注册</span>
        <p>暂无绑定手机号</p>
      </div>
    </div>
    <div class="numbers">
      <div class="balance">
        <span class="number">0.00</span>元
        <br />
        <span>我的余额</span>
        </div>
      <div class="reduction">
        <span class="number">0</span>个
        <br />
        <span>我的优惠</span>
      </div>
      <div class="integral">
        <span class="number">0</span>分
        <br />
        <span>我的积分</span>
      </div>
    </div>
    <div class="functions">
      <div class="message">
        <img src="~assets/img/profile/message.svg" alt="">
        <span>我的消息</span>
      </div>
      <div class="points">
        <img src="~assets/img/profile/points.svg" alt="">
        <span>积分商城</span>
      </div>
      <div class="card last">
        <img src="~assets/img/profile/card.svg" alt="">
        <span>会员卡</span>
      </div>
    </div>
    <div class="car">
      <div class="my-car">
        <img src="~assets/img/profile/car.svg" alt="">
        <span>我的购物车</span>
      </div>
      <div class="download-car last">
        <img src="~assets/img/profile/download.svg" alt="">
        <span>下载购物APP</span>
      </div>
    </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    name: 'Profile',
    components: {
      NavBar
    }
  }
</script>
<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }

  .info {
    color: #fff;
    font-size: 15px;
    background-color: var(--color-tint);
    line-height: 20px;
    border-bottom: 2px solid #f0f0f0;
  }

  .info .login-register {
    display: inline-block;
    position: relative;
    left: 30px;
    bottom: 25px;
  }

  .info .login-register p {
    font-size: 13px;
  }

  .info img {
    margin: 0 0 10px 20px;
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  .numbers {
    display: flex;
  }

  .balance, .reduction, .integral {
    font-size: 16px;
    padding: 20px;
    text-align: center;
    border-left: 1px solid #f0f0f0;
    border-bottom: 15px solid #f0f0f0;
    flex: 1;
  }

  .number {
    font-size: 18px;
    color: var(--color-high-text);;
  }

  .functions {
    display: flex;
    flex-direction: column;
    font-size: 15px;
    border-bottom: 15px solid #f0f0f0;
  }

  .functions>div {
      padding: 10px;
      border-bottom: 1px solid #c0c0c0;
  }

  .functions .last {
    border-bottom: none;
  }

  .functions img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin-right: 10px;
  }

  .car {
    display: flex;
    flex-direction: column;
    font-size: 15px;
  }

  .my-car, .download-car {
    flex: 1;
    padding: 10px;
    border-bottom: 1px solid #c0c0c0;
  }

  .car img {
    height: 20px;
    width: 20px;
    vertical-align: middle;
    margin-right: 10px;
  }

  .car .last {
    border-bottom: none;
  }
</style>
