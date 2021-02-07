<template>
  <el-container class="layout">
    <el-aside>
      <el-menu
        background-color="#0050b3"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        :default-active="$route.path">
          <el-menu-item
            v-for="{ path, title } in menus"
            :index="path"
            :key="path">
            <span slot="title">{{title}}</span>
          </el-menu-item>
        </el-menu>
    </el-aside>

    <el-main>
        <router-view />
      </el-main>
  </el-container>
</template>

<script>
  import { getUserInfo } from '@/utils'

  export default {
    name: 'Home',
    data () {
      return {
        menus: [],
      }
    },
    created () {
      let routes = getUserInfo(this.$store.state.user) // 获取权限对应的路由
      routes.map( c => {
        this.menus.push({
          path: `/home/${c.path}`,
          title: c.meta.title
        })
      })
    }
  }
</script>

<style lang="less" scoped>
</style>