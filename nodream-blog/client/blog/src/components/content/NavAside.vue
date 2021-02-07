<template>
  <el-row
    class="tac"
    :style="{ background: isSelectColor }"
  >

    <el-col>
      <img src="~assets/img/common/avatar.jpg">
      <p style="color: #ffffff">Simple is better than complex.</p>

      <!--导航栏-->
      <div
        class="el-menu-box"
        @click="handleMenu($event)">

        <div>
          <router-link
            :to="{path: '/picture'}"
            class="path">照片墙</router-link>
        </div>
      </div>

      <!--改变主题颜色-->
      <!-- <div class="change-bg-color" @click="changeBg($event)">
        <div class="white" title="简洁白" style="background: #ffffff"></div>
        <div class="pink" title="少女粉" style="background: #ff60af"></div>
        <div class="black" title="夜间模式" style="background: #000000"></div>
        <div class="yellow" title="咸蛋黄" style="background: #f9f900"></div>
        <div class="purple" title="胖次蓝" style="background: #3f51b5"></div>
        <div class="red" title="姨妈红" style="background: #ff0000"></div>
      </div> -->
    </el-col>
  </el-row>
</template>

<script>

  export default {
    name: 'NavAside',

    data() {
      return {
        activeRoute: '/posts', // 默认跳转到文章列表页
      }
    },

    computed: {
      isSelectColor() {
        return this.$mutations.getColor()
      }
    },

    methods: {
      // 处理导航点击
      handleMenu(e) {
        if ( e.target && e.target.innerText == '照片墙' ) {
          this.$router.push('/picture')
        }
      },

      // 改变侧边栏颜色
      changeBg(e) {
        this.$mutations.setColor(e.target.style.background)
      }
    }
  }
</script>

<style scoped>
  .tac {
    height: 100%;
  }

  .el-menu-box {
    margin: 20px 0;
  }

  .el-menu {
    border: none;
  }

  img {
    margin-top: 10px;
    width: 50%;
    border-radius: 50%;
  }

  .iconfont {
    font-size: 30px;
  }

  .change-bg-color {
    display: flex;
    justify-content: space-around;
    margin: 0 10px
  }

  .change-bg-color > div {
    height: 22px;
    flex: 1;
    margin-left: 5px;
  }

  .path {
    text-decoration: none;
    color: #fff;
  }
</style>