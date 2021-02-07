<template>
  <div class="resource">
      <v-header />
      <div class="content">
      <el-card class="upload-card">
        <div slot="header" class="clearfix">
          <div class="upload-btn" @click="dialogVisible = true">上传资源</div>
          <el-dialog title="表单弹框" :visible.sync="dialogVisible" width="30%">
          <el-form ref="form" label-width="80px" :model="form" :rules="rules">
            <el-form-item label="资源名称" prop="title">
              <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="资源描述">
              <el-input v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item label="所属社团" prop="community">
              <el-input v-model="form.community"></el-input>
            </el-form-item>
            <el-form-item label="文件">
              <el-upload
                class="upload"
                accept="*"
                name="file"
                ref="upload"
                action="aaa"
                :limit="1"
                :before-upload="beforeUpload"
                :auto-upload="false"
                :on-change="handleChange"
                :show-file-list="false">
                <el-button size="small" type="primary" v-if="isHideBtn">点击上传</el-button>
              </el-upload>
              <div class="show" v-if="!isHideBtn">{{fileName}}</div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">发 布</el-button>
          </span>
          </el-dialog>
        </div>
      </el-card>
    <el-card class="show-card" v-if="isShowFileList">
      <span class="title">资源列表</span>
      <ul class="show-files">
        <li v-for="(item, index) in showFileList" :key="index" class="show-file-item">
          <div class="item-content">
            <div class="community">所属社团：{{item.community}}</div>
            <div class="user">发布者：{{item.user}}</div>
            <div class="name">资源名称：{{item.title}}</div>
            <div class="url">资源链接：<a :href="host + item.file_url" target="_blank">{{item.file_name}}</a></div>
            <div class="create-time">发布时间：{{new Date(item.create_time).Format("yyyy-MM-dd hh:mm")}}</div>
          </div>
          <el-divider><i class="el-icon-edit"></i></el-divider>
        </li>
      </ul>
    </el-card>
    </div>
  </div>
</template>

<script>
  import Header from 'components/content/Header';
  import host from 'network/host';
  import { getResource, uploadResources } from 'network/resource';

  export default {
    name: 'Resource',
    components: {
      'v-header': Header
    },
    data() {
      return {
        uploadForm: new FormData(),
        dialogVisible:false,
        form: {
          title: '', // 名称
          desc: '', // 描述
          community: '',
        },
        fileName: '',
        isHideBtn: true,
        host: host,
        token: null,
        fileList: [
          {
            file: null,
            name: '测试'
          }
        ],
        isShowFileList: false,
        showFileList: [],
        rules: {
          title: [
            { required: true, message: '请填写资源名称', trigger: 'blur' }
          ],
          community: [
            { required: true, message: '请填写所属社团名称', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleChange (file) {
        this.isHideBtn = false; // 隐藏上传按钮
        this.fileName = file.name;
      },
      beforeUpload(file) {
        this.uploadForm.append('file', file, file.name);
        return false;
      },
      submit() {
        if (this.form.title == '' || this.form.community == '') {
          this.$notify.error({
            title: '请填写完整的信息'
          });
        } else {
          this.uploadForm.append('title', this.form.title);
          this.uploadForm.append('desc', this.form.desc);
          this.uploadForm.append('community', this.form.community);
          if (this.fileName != '') {
            this.$refs.upload.submit();
          }
          this.dialogVisible = false;
          let token = this.$authorization();
          uploadResources(token, this.uploadForm).then((res) => {
            if (res.data == '上传成功') {
              this.$notify.success({
                title: '上传成功'
              });
              this.$router.go(0);
            } else {
              this.$notify.error({
                title: '上传失败'
              });
            }
          })
        }
      }
    },
    created() {
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
      };

      let token = this.$authorization();
      getResource(token).then((res) => {
        if (res.data.code == 1) {
          this.showFileList = res.data.data;
          this.isShowFileList = true;
        }
      });
    }
  }
</script>

<style scoped>

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  /* .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  } */

  .upload-card {
    margin: 0 auto;
    margin-top: 30px;
    width: 800px;
  }

  .upload-demo {
    margin-top: 20px;
  }

  .show-card {
    margin: 0 auto;
    margin-top: 30px;
    width: 800px;
  }

  .show-files {
    list-style-type: none;
  }

  .title {
    font-size: 20px;
    color: #66b1ff;
    display: inline-block;
    margin-bottom: 20px;
  }

  .show-file-item {
    margin-left: 10px;
  }

  .url a {
    text-decoration: none;
  }

  .show-card {
    height: 600px;
    overflow: auto;
  }

  .upload-btn {
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

  .upload-btn:hover {
    background-color: #FFF;
    color: #000000;
  }
</style>