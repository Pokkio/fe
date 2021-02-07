<template>
  <div class="chat">
    <v-header :avatar="avatar" :name="name" />
    <div class="chat-box">
      <div class="chat-header">聊天室</div>
      <div class="chat-main">
        <div class="chat-content">
          <ul>
            <li v-for="(item, index) in msg" :key="index">
              <div class="msg" :class="{left: item.isLeft, msgRight: item.isRight}">
                <div class="user">{{item.from_user}}</div>
                <div class="img-content" v-if="item.type == 1">
                  <img :src="host + 'static/img/' + item.content">
                </div>
                <div class="content" v-else>{{item.content}}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="func">
          <img class="emoji" src="./emoji.png" @click="emojiDialogVisible = true"></img>
          <img class="emoji" src="./image.png" @click="imgDialogVisible = true"></img>
          <el-dialog title="选择图片" :visible.sync="imgDialogVisible">
            <el-form ref="imgForm" label-width="80px">
              <el-form-item label-width="图片">
                <el-upload
                 class="uploadImg"
                 accept="image/png,image/gif,image/jpg,image/jpeg"
                 name="uploadImg"
                 ref="uploadImg"
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
              <el-button @click="imgDialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="upload">发 送</el-button>
            </span>
          </el-dialog>
          <el-dialog title="选择emoji" :visible.sync="emojiDialogVisible" width="19%">
            <VEmojiPicker @select="selectEmoji" />
             <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="emojiDialogVisible = false">确认</el-button>
            </span>
          </el-dialog>
        </div>
        <div class="footer">
          <el-input v-model="input" @keyup.enter.native="send" title="可使用回车键发送"></el-input>
          <el-button @click="send">发送</el-button>
        </div>
        <div class="notice">
          <div class="notice-content">
            <div class="notice-title" @click="showDialog">群公告</div>
            <div class="content">{{noticeContent}}</div>
            <el-dialog title="公告内容" width="50%" :visible.sync="dialogVisible">
              <el-form ref="form" label-width="80px" :model="form" :rules="rules">
                <el-form-item prop="content">
                  <el-input v-model="form.content"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">发 布</el-button>
              </span>
            </el-dialog>
          </div>
          <div class="members">
            <div class="count">成员<span v-if="count != 0">({{count}})</span></div>
            <div class="names">
              <ul>
                <li v-for="(item, index) in members" class="members-item">
                  <img :src="host + item.avatar" class="avatar"><span>{{item.name}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Header from 'components/content/Header';
  import VEmojiPicker from 'v-emoji-picker';
  import { getMessage, sendMessage, getNotice, uploadNotice, uploadImg } from 'network/chat';
  import { member } from 'network/banner';
  import host from 'network/host';

  export default {
    name : 'Chat',
    data() {
      return {
        is_admin: 0,
        uploadImgUrl: '',
        isHideBtn: true,
        imgDialogVisible: false,
        emojiDialogVisible: false,
        rules: {
          content: [
            { required: true, message: '请填写公告内容', trigger: 'blur' }
          ]
        },
        dialogVisible: false,
        count: 0,
        form: {
          content: '',
        },
        imgForm: new FormData(),
        noticeContent: 1,
        avatar: '',
        name: '',
        community: '',
        host: host,
        isLeft: true,
        isRight: false,
        token: null,
        input: '',
        msg: {},
        timer: null,
        myMsg: {},
        members: []
      }
    },
    components: {
      'v-header': Header,
      VEmojiPicker
    },
    created() {
      let avatar = sessionStorage.getItem('avatar');
      this.avatar = avatar;
      let name = sessionStorage.getItem('user');
      this.name = name;
      let community = sessionStorage.getItem('community');
      this.community = community;
      let is_admin = sessionStorage.getItem('is_admin');
      this.is_admin = is_admin;
      let token = this.$authorization();
      this.token = token;
      // this.get();
      let timer = setInterval(this.get, 1500);
      this.timer = timer;
    },
    destroyed() {
      clearInterval(this.timer);
    },
    updated() {
      // 将滚动放在页面更新之后
      // let ele = document.getElementsByClassName('chat-content')[0];
      // ele.scrollTop = ele.scrollHeight;
    },
    mounted() {
      getNotice(this.token, this.community).then((res) => {
        if (res.data.code == 1) {
          this.noticeContent = res.data.data.content;
        } else {
          this.noticeContent = '公告获取失败';
        }
      });
      member(this.token).then((res) => {
        for (let item in res.data.data.member) {
          for (let item2 of res.data.data.member[item]) {
            this.members.push(item2);
          }
        }
      })
    },
    methods: {
      selectEmoji(emoji) {
        this.input += emoji.data
      },
      showDialog() {
        if (this.is_admin == 1) {
          this.dialogVisible = true;
        } else {
          this.dialogVisible = false;
          this.$notify.warning({title: '该账号不是管理员，不可编辑！'});
        }
      },
      handlePictureCardPreview (file) {
        this.uploadImgUrl = URL.createObjectURL(file.raw);
        if (this.uploadImgUrl) {
          this.isHideBtn = false; // 隐藏图片上传按钮，显示图片
        }
      },
      beforeupload(file) { // 阻止el-input默认上传
        this.imgForm.append('img', file, file.name);
        return false;
      },
      upload() {
        if (this.uploadImgUrl == ''){
          this.$notify.error({
            title: '未选择图片',
          });
        } else {
          this.imgForm.append('community', this.community);
          this.$refs.uploadImg.submit();
          this.imgDialogVisible = false;
          uploadImg(this.token, this.imgForm).then((res) => {
            if (res.data.code == 1) {
              this.$notify.success({title: '发送成功'});
            } else {
              this.$notify.error({title: '发送失败 '});
            }
          })
        }        
      },
      submit() {
        if (this.form.content == '') {
          this.$notify.error({
            title: '内容不能为空'
          })
        } else {
          this.noticeContent = this.form.content;
          uploadNotice(this.token, this.community, this.form.content).then((res) => {
            if (res.data.code == 1) {
              this.dialogVisible = false;
            } else {
              this.$notify.error({
                title: '发布失败'
              })
            }
          })
        }
      },
      get() {
        getMessage(this.token, this.community).then((res) => {
          for (let item of res.data.data.chat) {
            if (item.from_user != this.name) {  // 聊天记录发布者不等于当前登录用户
              item.isRight = false
            } else {
              item.isRight = true
            }
          }
          this.msg = res.data.data.chat;
        })
      },
      send() {
        if (this.input == '') {
          this.$notify.error({
            title: '消息不能为空'
          });
        } else {
          let message = JSON.stringify({community: this.community, content: this.input});
          this.msg.push({from_user: this.name, content: this.input, isRight: true})
          sendMessage(this.token, message).then((res) => {
            if (res.data.code == 1) {
              this.$notify.success({
                title: '发送成功'
              });
              this.input = '';
              let ele = document.getElementsByClassName('chat-content')[0];
              ele.scrollTop = ele.scrollHeight;
            }
          })
        }
      }
    }
  }
</script>

<style>
  .chat-box {
    width: 1000px;
    margin: 50px auto;
  }

  .chat-main {
    position: relative;
  }

  .el-input {
    font-size: 15px;
  }

  .chat-content {
    padding: 10px 10px 0 10px;
    width: 75%;
    height: 50vh;
    overflow-y: auto;
    border: 1px solid #f0f0f0;
    background-color: #f1f1f1;
  }

  .chat-content ul li {
    list-style-type: none;
    margin-bottom: 20px;
  }

  .chat-header {
    background-color: #66b1ff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 22px;
    color: #ffffff;
  }

  .msg {
    display: flex;
  }

  .msg .user {
    text-align: center;
    width: 40px;
    padding: 5px;
    height: 30px;
    margin-right: 10px;
  }

  .msg .content {
    max-width: 400px;
    line-height: 30px;
    word-wrap: break-word;
    padding: 5px;
    border-radius: 4px;
    background-color: #ffffff;
  }

  .footer {
    display: flex;
    width: 75%;
  }

  .el-button {
    width: 80px;
    color: #ffffff;
    background-color: #66b1ff;
  }

  .msgRight {
    flex-direction: row-reverse;
  }

  .msgRight div {
    justify-self: flex-end;
  }

  .msgRight .content {
    background-color: green;
  }

  .chat-content .content {
    padding: 0px 10px;
  }

  .notice {
    position: absolute;
    top: 0;
    right: 0;
    width: 25%;
    border: 1px solid #f0f0f0;
    height: 57vh;
  }

  .notice-title {
    font-size: 20px;
    cursor: pointer;
    padding: 10px 0 0 10px;
    color: #66b1ff;
  }

  .notice-content .content {
    height: 20vh;
    padding: 10px;
    width: 100%;
    word-wrap: break-word;
    font-size: 16px;
    overflow-y: auto;
    border-bottom: 1px solid #f0f0f0;
  }

  .count {
    padding: 10px 0 0 10px;
    color: #66b1ff;
  }

  .names {
    height: 30vh;
    overflow-y: auto;
  }

  .members-item {
    line-height: 30px;
    padding: 5px 5px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    vertical-align: middle;
    margin-right: 5px;
  }
  
  .func {
    width: 75%;
    background-color: #f1f1f1;
  }

  .func i {
    cursor: pointer;
    margin: 5px 10px;
  }

  .img-content img {
    width: 200px;
  }

  .emoji {
    vertical-align: baseline;
    width: 20px; 
    height: 20px; 
    margin-left: 10px; 
    margin-right: 10px;
    cursor: pointer;
  }
</style>