<template>
  <div class="register">
    <el-row>
      <el-col :sm="{span: 7, offset: 9}">
        <div class="box">
          <h3>注册</h3>
          <el-form ref="register" :model="form" :rules="rules">
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="form.username"
                prefix-icon="el-icon-user"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input
              v-model="form.password"
              prefix-icon="el-icon-warning-outline"
              show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input
              v-model="form.password2"
              prefix-icon="el-icon-warning-outline"
              show-password
              ></el-input>
            </el-form-item>
            <el-form-item label="所属社团" prop="community" style="margin-top: 10px">
              <el-select v-model="form.community" placeholder="请选择" style="width: 346px;">
                <el-option
                 v-for="item in communities"
                 :label="item.label"
                 :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="权限密码" prop="qx_pwd">
              <el-input
              v-model="form.qx_pwd"
              prefix-icon="el-icon-turn-off"
              show-password
              ></el-input>
            </el-form-item>
            <el-button type="primary" round @click.native="register" class="register-btn">注册</el-button>
            <div><el-button type="danger" round @click.native="cancel">取消</el-button></div>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { register, communityList } from 'network/register';

export default {
  name: 'Register',
  data() {
    return {
      communities: [],
      form: {
        username: '',
        password: '',
        password2: '',
        qx_pwd: '',
        community: ''
      },
      inputCount: 0,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        community: [
          { required: true, message: '请填写所属社团', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    register() {
      if (this.form.username == '' || this.form.password == '' || this.form.password2 == '' || this.form.community == '') {
        this.$notify.error({title: '请填写完整信息'});
      } else if ((6 > parseInt(this.form.password.length) || parseInt(this.form.password.length > 10)) || (6 > parseInt(this.form.password2.length) || parseInt(this.form.password2.length > 10))) {
        this.$notify.error({title: '密码长度在 6 到 10 个字符'});
      }  else if (this.form.password !== this.form.password2) {
        this.$notify.error({title: '密码不一致'});
      }
      else {
        register(this.form).then((res) => {
          if (res.data.code == 0) {
            console.log(res);
            this.$notify.error({title: '用户名已存在'});
            this.form.username = '';
            this.form.password = '';
            this.form.password2 = '';
            this.form.community = '';
            this.form.qx_pwd = '';
          } else {
            console.log(res);
            this.$notify.success({title: '注册成功'});
            this.$router.push('/login');
          }
        })
      }
    },
    cancel() {
      this.$router.push('/login')
    }
  },
  created() {
    communityList().then((res) => {
      if (res.data.code == 1) {
        let index = 1
        for (let item of res.data.data) {
          this.communities.push({value: item, label: item});
          index += 1;
        }
      } else {
        this.$notify.error({title: '社团列表获取超时！'});
      }
    })
  }
}
</script>

<style scoped>
  .login {
    height: 100%;
    background-color: #f0f0f0;
  }

  .box {
    width: 80%;
    padding: 50px;
    background-color: #ffffff;
    border: 1px solid #ffffff;
    border-radius: 5px;
    box-shadow: 0 0 10px #c0c0c0;
    transform: translate(0, 20%);
  }

  .box h3 {
    text-align: center;
  }
  
  .el-form-item {
    margin-bottom: 10px;
  }

  .box .el-button {
    margin-top: 30px;
    width: 100%;
  }
</style>