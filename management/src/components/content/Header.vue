<template>
  <el-row class="header">
    <el-col :sm="{span: 10}">
      <div class="left">
        <div class="home" style="cursor: pointer;" @click="toHome"><span>首页</span></div>
        <div class="chat" style="cursor: pointer;" @click="toChat"><span>聊天室</span></div>
        <div class="zi-yuan" style="cursor: pointer;" @click="toResource"><span>资源库</span></div>
        <div class="peng-you" style="cursor: pointer;" @click="toMoments"><span>朋友圈</span></div>
        <div class="work" style="cursor: pointer;" @click="toWork"><span>作业</span></div>
        <div class="signout" style="cursor: pointer;" @click="toOut"><span>登出</span></div>
      </div>
      </el-col>
    <el-col :sm="{span: 4, offset: 10}">
      <div class="right">
        <img :src="avatar" style="height: 50px; width: 50px; cursor: pointer;" @click="dialogVisible = true" class="avatar">
        <el-dialog title="上传头像" :visible.sync="dialogVisible" width="15%">
          <el-form ref="form" label-width="80px">
            <el-form-item>
              <el-upload
                class="upload"
                accept="image/png,image/gif,image/jpg,image/jpeg"
                name="img"
                ref="uploadAvatar"
                action="aaa"
                :limit="1"
                :auto-upload="false"
                :on-change="handlePictureCardPreview"
                :before-upload="beforeupload"
                :show-file-list="false">
                <div class="showImg" :style="{backgroundImage:'url(' + uploadImgUrl + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"  v-if="!isHideBtn"></div>
                <el-button size="small" type="primary" v-if="isHideBtn">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="submit">更新</el-button>
          </span>
        </el-dialog>
        <span class="name" style="color: #c0c0c0;" :title="name">{{name}}</span>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { signout } from 'network/signout';
  import { avatar } from 'network/avatar';
  import { member } from 'network/banner';
  import host from 'network/host';

  export default {
    name: 'Header',
    inject:['reload'],
    data() {
      return {
        token: '',
        avatar: '',
        name: '',
        host: host,
        dialogVisible: false,
        uploadImgUrl: '',
        isHideBtn: true,
        form: new FormData()
      }
    },
    methods: {
      handlePictureCardPreview (file) {
        this.uploadImgUrl = URL.createObjectURL(file.raw);
        if (this.uploadImgUrl) {
          this.isHideBtn = false; // 隐藏图片1上传按钮，显示图片
        }
      },
      beforeupload(file) { // 阻止el-input默认上传
        this.form.append('avatar', file, file.name);
        return false;
      },
      submit() {
        this.$refs.uploadAvatar.submit();
        this.dialogVisible = false;
        avatar(this.token, this.form).then((res) => {
          if (res.data.code == 1) {
            this.$notify.success({title: '更新头像成功'});
            let avatar = this.host + res.data.data.avatar;
            sessionStorage.setItem('avatar', avatar);
            this.avatar = avatar;
            this.reload();
          } else {
            this.$notify.error({title: '更新头像失败'});
          }
        })
      },
      toHome() {
        this.$router.push('/');
      },
      toChat() {
        this.$router.push('/chat');
      },
      toWork() {
        this.$router.push('/work');
      },
      toMoments() {
        this.$router.push('/moments')
      },
      toResource() {
        this.$router.push('/resource')
      },
      toOut() {
        signout(this.token).then((res) => {
          if (res.data.code == 1) {
            this.$cookies.remove('Authorization');
            this.$cookies.remove('sessionid');
            sessionStorage.removeItem('avatar');
            sessionStorage.removeItem('community');
            sessionStorage.removeItem('user');
            sessionStorage.removeItem('is_admin');
            this.$cookies.remove('sessionid');
            this.$notify.success({title: '登出成功'});
            this.$router.push('/login');
          }
        })
      },
      getMember(token) {
        member(token).then((res) => {
          let data = res.data.data;
          this.avatar = this.host + data.owner.avatar;
          this.name =  data.owner.name;
          sessionStorage.setItem('avatar', this.host + data.owner.avatar); // 保存头像
        });
      }
    },
    mounted() {
      this.getMember(this.token);
    },
    created() {
      let token = this.$authorization();
      this.token = token;
    }
  }
</script>

<style>
  .header {
    width: 100%;
    background-color: #000000;
    color: #DEB887;
    border-bottom: 2px solid #DEB887;
  }

  .left {
    display: flex;
  }

  .left div {
    padding: 20px 10px;
    margin: 0 30px;
  }

  .right {
    color: #ffffff;
    display: flex;
    line-height: 65px;
    text-align: center;
  }

  .right img {
    display: inline-block;
    margin-right: 20px;
    margin-top: 8px;
    border-radius: 50%;
  }

  .el-form-item__content {
    margin: 0!important;
  }

  .showImg {
    width: 200px;
    height: 200px;
  }
</style>