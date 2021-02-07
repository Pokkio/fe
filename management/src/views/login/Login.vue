<template>
  <div class="login">
    <el-row>
      <el-col :sm="{span: 7, offset: 9}">
        <div class="box">
          <h4>账号密码登录</h4>
          <el-input
           placeholder="手机号 / 邮箱 / 用户名"
           v-model="username"
           prefix-icon="el-icon-user"
           maxlength=10
           clearable
          ></el-input>
          <el-input
           placeholder="请输入密码"
           v-model="password"
           prefix-icon="el-icon-warning-outline"
           maxlength=10
           show-password
           @keyup.enter.native="login"
          ></el-input>
          <el-button type="primary" round @click.native="login">登录</el-button>
          <div class="utils">
            <div class="sign-in"><span @click="register">注册</span></div>
            <!-- <div class="remember-password"><el-checkbox v-model="checked" @click="remember">记住密码</el-checkbox></div> -->
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { login } from 'network/login';

  export default {
    name: 'Login',
    data() {
      return {
        username: '',
        password: '',
        checked: false
      }
    },
    methods: {
      login() {
        login(this.username, this.password).then((res)=>{
          let { code, msg, token } = res.data;
          if (msg == '登录成功') {
            this.$notify.success({
              title: '登录成功',
            });
            sessionStorage.setItem('user', this.username); // 保存用户名
            // if (this.checked) { // 记住密码
            //   this.$cookies.set('user', this.username, '3d');
            //   this.$cookies.set('password', this.password, '3d')
            // }
            this.$cookies.set('Authorization', token, '3d');
            this.$router.push('/');
          } else {
            this.$notify.error({
              title: '登录失败',
              message: msg
            });
          };
        })
      },
      register() {
        this.$router.push('/register')
      },
      remember() {
        if (this.checked) {

        } else {
          return false;
        }
      }
    }
  }
</script>

<style scoped>
  .login {
    height: 100%;
    background-color: #f0f0f0;
  }

  .box {
    width: 70%;
    padding: 50px;
    background-color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px #c0c0c0;
    transform: translate(0, 70%);
  }

  .box h4 {
    text-align: center;
  }
  
  .box .el-input {
    margin-top: 30px;
  }

  .box .el-button {
    margin-top: 30px;
    width: 100%;
  }

  .box .utils {
    margin-top: 20px;
    display: flex;
    font-size: 16px;
    color: #c0c0c0;
  }

  .sign-in {
    flex: 1;
  }

  .sign-in, .remember-password {
    cursor: pointer;
  }

  .sign-in:hover {
    color: #409EFF;
  }
</style>