<template>
  <div class="work">
    <v-header />
    <div class="content">
      <el-card class="card" v-if="isAdmin == 1">
        <el-form label-width="80px" :model="form" :rules="rules">
          <el-form-item label="作业名称" prop="title">
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item label="所属社团" prop="community">
            <el-input v-model="form.community"></el-input>
          </el-form-item>
          <el-form-item label="作业内容" prop="content">
            <el-input v-model="form.content"></el-input>
          </el-form-item>
        </el-form>
        <div class="submit">
          <div class="release" @click="submit">发布作业</div>
          <!-- <el-button type="primary" @click="submit" >发布作业</el-button> -->
        </div>
      </el-card>
      <el-card v-if="works" class="works-card">
        <div class="works">
          <h3 class="title">作业列表</h3>
          <ul class="work-list">
            <li class="work-item" v-for="(item, index) in works" :key="index">
              <div class="item">
                <div class="user">发布者：{{item.user}}</div>
                <div class="community">所属社团：{{item.community}}</div>
                <div class="work-title">作业名称：{{item.title}}</div>
                <div class="work-content">作业内容：{{item.content}}</div>
                <div class="time">发布时间：{{new Date(item.create_time).Format("yyyy-MM-dd hh:mm")}}</div>
              </div>
              <hr />
              <!-- <el-divider><i class="el-icon-edit"></i></el-divider> -->
            </li>
          </ul>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import Header from 'components/content/Header'
  import { work, getWork } from 'network/work';

  export default {
    name: 'Work',
    data() {
      return {
        isAdmin: 0, // 只有管理员才显示发布作业框
        token: null,
        works: [],
        form: {
          title: '',
          community: '',
          content: ''
        },
        rules: {
          title: [
            { required: true, message: '请填写作业名称', trigger: 'blur' }
          ],
          community: [
            { required: true, message: '请填写所属社团名称', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '请填写作业内容', trigger: 'blur' }
          ]
        }
      };
    },
    components: {
      'v-header': Header
    },
    methods: {
      submit() {
        if (this.form.title == '' || this.form.community == '' || this.form.content == '') {
          this.$notify.error({
             title: '请填写所有信息',
           })
        } else {
          work(this.token, this.form.title, this.form.community, this.form.content).then((res) => {
            if (res.data.code == 1) {
            this.$notify.success({
              title: '成功',
              message: '作业已提交'
            })
            this.form.title = '';
            this.form.community = '';
            this.form.content = '';
            } else {
              this.$notify.error({
              title: '失败',
              message: '作业提交失败'
            })
            }
          })
        }
      },
    },
    created() {
      this.token = this.$authorization();
      this.isAdmin = sessionStorage.getItem('is_admin');
      getWork(this.token).then((res) => {
        if (res.data.code == 1) {
          this.works = res.data.data;
        } else {
          this.$notify.error({title: '作业列表获取失败!'});
        }
      });
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
    }
  }
</script>

<style scoped>
  .el-card {
    margin: 50px auto;
    width: 30%;
  }

  .el-form-item__label {
    color: #409EFF;
  }

  .submit {
    text-align: center;
  }

  .title {
    color: #409EFF;
    margin-bottom: 20px;
  }

  .work-item {
    list-style-type: none;
    font-size: 18px;
  }

  .work-item div {
    padding: 10px 10px;
  }

  .works-card {
    width: 40%;
  }

  .release {
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
</style>