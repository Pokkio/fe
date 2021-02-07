<template>
  <div class="left-nav">
    <ul>
      <li>
        <i class="icon iconfont icon-goumai"></i>
        <div>收银</div>
      </li>
      <li>
        <i class="icon iconfont icon-dianpu"></i>
        <div>店铺</div>
      </li>
      <li>
        <i class="icon iconfont icon-hanbao"></i>
        <div>商品</div>
      </li>
      <li>
        <i class="icon iconfont icon-huiyuanqia"></i>
        <div>会员</div>
      </li>
      <li>
        <i class="icon iconfont icon-gongnengjianyi"></i>
        <div>统计</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftNav'
}
</script>
  
<style>
  @import url('http://at.alicdn.com/t/font_1692159_loo4z5o5hh8.css');
  
  .left-nav {
    color: #fff;
    font-size: 15px;
    background-color: #1D8CE0;
    float: left;
    height: 100vh;
    width: 4%;
  }

  .iconfont {
    font-size: 30px;
  }

  .left-nav li {
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
  }

  .el-tabs__item {
    font-size: 20px;
    height: 51px;
    line-height: 50px;
    padding-left: 40px;
  }

  .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
    padding-left: 40px;
  }
</style>