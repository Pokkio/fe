<template>
  <div class="moments">
    <v-header />
    <div class="release" @click="dialogVisible = true">发布朋友圈</div>
    <!-- <div class="release">
      <el-button type="primary" @click="dialogVisible = true" round>发布朋友圈</el-button>
    </div> -->
    <el-card class="main">
      <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
        <el-form ref="form" label-width="80px">
          <el-form-item label="内容">
            <el-input v-model="content"></el-input>
          </el-form-item>
          <el-form-item label="图片">
            <el-upload
              class="upload"
              accept="image/png,image/gif,image/jpg,image/jpeg"
              name="img"
              ref="uploadImg1"
              action="aaa"
              :limit="1"
              :auto-upload="false"
              :on-change="handlePictureCardPreview1"
              :before-upload="beforeupload1"
              :show-file-list="false">
              <div class="showImg" :style="{backgroundImage:'url(' + uploadImg1Url + ')', backgroundRepeat:'no-repeat', backgroundPosition:'center center', backgroundSize: 'contain'}"  v-if="!isHideBtn1"></div>
              <el-button size="small" type="primary" v-if="isHideBtn1">点击上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="submit">发 布</el-button>
        </span>
      </el-dialog>
      <ul class="show-moments">
        <li v-for="(item, index) in this.moments" :key="index" class="show-moments-item">
          <div class="user">
            <img :src="host + item.avatar" style="width: 30px; height: 30px">
            {{item.user}}
          </div>
          <div class="content">{{item.content}}</div>
          <div class="imgs">
            <el-image v-for="img in item.imgs" :src="host + img" :key="img" style="width: 200px; margin: 0 10px;" class="moment-img" v-if="img != 'static/media/'"></el-image>
          </div>
          <div class="created-time">{{new Date(item.create_time).Format("yyyy-MM-dd hh:mm")}}</div>
          <el-divider></el-divider>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<script>
  import Header from 'components/content/Header';
  import { getMoments, uploadMoment } from 'network/moments';
  import host from 'network/host';

  export default {
    name: 'Moments',
    components: {
      'v-header': Header
    },
    data() {
      return {
        dialogVisible:false,
        form: new FormData(),
        token: '',
        host: host,
        moments: [],
        isShowMoments: false,
        content: '',
        uploadImg1Url: '', // 图片1
        uploadImg2Url: '',  // 图片2
        isHideBtn1: true,
        isHideBtn2: true
      }
    },
    methods: {
      handlePictureCardPreview1 (file) {
        this.uploadImg1Url = URL.createObjectURL(file.raw);
        if (this.uploadImg1Url) {
          this.isHideBtn1 = false; // 隐藏图片1上传按钮，显示图片
        }
      },
      handlePictureCardPreview2 (file) {
        this.uploadImg2Url = URL.createObjectURL(file.raw);
        if (this.uploadImg2Url) {
          this.isHideBtn2 = false; // 隐藏图片2上传按钮，显示图片
        }
      },
      beforeupload1(file) { // 阻止el-input默认上传
        this.form.append('file', file, file.name);
        return false;
      },
      beforeupload2(file) {
        this.form.append('file2', file, file.name);
        return false;
      },
      submit() {
        if (this.content == '' && this.uploadImg1Url == '' && this.uploadImg2Url == ''){
          this.$notify.error({
            title: '发布失败',
            message: '你未选择任何内容'
          });
        } else {
          this.form.append('content', this.content);
          if (this.uploadImg1Url != '') {
            this.$refs.uploadImg1.submit();
          }
          if (this.uploadImg2Url != '') {
            this.$refs.uploadImg2.submit();
          }
          this.dialogVisible = false;
          let token = this.$authorization();
          uploadMoment(token, this.form).then((res) => {
            if (res.data == '上传成功') {
              this.$notify.success({
                title: '发布成功'
              });
              this.$router.go(0);
            } else {
              this.$notify.error({
                title: '发布失败'
              });
            }
          })
        }        
      }
    },
    mounted() {
      getMoments(this.token).then((res) => {
        if (res.data.code == 1) {
          let data = res.data.data;
          for (let item of data) {
            this.moments.push(item);
          }
        } else {
          this.$notify.error({
            title: '失败',
            message: '朋友圈获取失败'
          })
        }
      });
    },
    created() {
      let token = this.$authorization();
      this.token = token;
      Date.prototype.Format = function (fmt) {
      var o = {
          "M+": this.getMonth() + 1, //月份 
          "d+": this.getDate(), //日 
          "h+": this.getHours(), //小时 
          "m+": this.getMinutes(), //分 
          "s+": this.getSeconds(), //秒 
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
          "S": this.getMilliseconds() //毫秒 
      };
      if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      return fmt;
      }
    }
  }
</script>

<style scoped>
  .main {
    margin: 40px auto;
    width: 40%;
  }

  /deep/ .el-card {
    height: 700px;
    overflow-y: auto;
    overflow-x: hidden;
    position: relative;
  }

  .release {
    position: fixed;
    right: 150px;
    top: 110px;
    border-radius: 4px;
    padding: 12px 20px;
    outline: 0;
    margin: 0;
    text-align: center;
    border: 1px solid #DCDFE6;
    cursor: pointer;
    white-space: nowrap;
    line-height: 1;
    display: inline-block;
    color: #FFF;
    background-color: #66b1ff;
    border-color: #66b1ff;
    transition: all .3s;
  }

  .release:hover {
    background-color: #FFF;
    color: #000000;
  }

  .moments-header {
    display: inline-block;
    line-height: 40px;
    height: 40px;
    font-size: 20px;
    text-align: center;
    width: 100%;
    background-color: #66b1ff;
    color: #ffffff;
  }

  .show-moments {
    margin-top: 30px;
    list-style-type: none;
  }

  .show-moments-item {
    margin-bottom: 20px;
  }

  .show-moments-item .content {
    color: #000000;
    padding: 20px;
    font-size: 22px;
  }
  
  .show-moments-item .user {
    height: 50px;
    line-height: 50px;
  }

  .show-moments-item .user img {
    vertical-align: middle;
  }

  .show-moments-item .imgs {
    margin-top: 20px;
  }

  .show-moments-item .created-time {
    margin-top: 20px;
    text-align: right;
    color: #66b1ff;
  }

  .showImg {
    width: 100px;
    height: 100px;
  }

  .user {
    font-size: 23px;
    font-weight: 600;
    color: #66b1ff;
  }
</style>