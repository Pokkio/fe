<template>
  <section class="login">
    <aside>
      <el-form
        ref="form"
        label-width="60px"
        label-position="left"
        :model="forms"
        :rules="rules">

        <el-form-item label="账号" prop="user">
          <el-input
            v-model="forms.user"
            clearable
            placeholder="请输入您的账号" />
        </el-form-item>

        <el-form-item label="密码" prop="pwd">
          <el-input
            v-model="forms.pwd"
            clearable
            type="password"
            placeholder="请输入您的密码"
            @keyup.enter.native="submit" />
        </el-form-item>

        <el-form-item label-width="0">
          <el-button
            class="btn-login"
            type="primary"
            @click="submit"
            >登录</el-button>
        </el-form-item>

      </el-form>
    </aside>
  </section>
</template>

<script>
  import { userMap, routes, saveUserInfo } from '@/utils'

  export default {
    name: 'Login',
    data () {
      return {
        forms: {
          user: '',
          pwd: ''
        },
        rules: {
          user: { required: true, message: '请输入您的账号！', trigger: 'blur' },
          pwd: { required: true, message: '请输入您的密码！', trigger: 'blur' }
        }
      }
    },
    methods: {
      submit () {
        this.$refs.form.validate(isValid => {
          if ( !isValid ) return
          
          let { user, pwd } = this.forms
          const authorityArr = userMap[user] // 根据账号名获取路由 FIXME(可与后端交互)
          if ( authorityArr ) {
            const children = []
            for (let item of authorityArr) {
              children.push(routes.find( c => c.meta.authority === item ))
            }
            const routers = {
              path: '/home',
              component: () => import('@/views/Home'),
              children: [
                {
                  path: '',
                  name: 'FIRST',
                  redirect: { name: children[0].name }
                },
                ...children
              ]
            }
            this.$router.addRoutes([routers])
            saveUserInfo(user, children) // 将路由信息保存到本地
            this.$store.commit('updateUser', user)
            this.$nextTick(() => this.$router.replace({ name: 'FIRST' }))  // 默认显示第一个子路由
          } else {
            this.$message.error('该账号无权限访问，请更换账号！')
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  aside {
    position: absolute;
    width: 400px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);

    /deep/.btn-login {
      width: 100%;
    }
  }
</style>
