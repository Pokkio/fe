<template>
  <div class="home">
    <v-header />
    <el-row class="content">
      <el-col :sm="{span: 20}" class="left-content">
        <el-row class="left-up">
          <el-col :sm="{span: 9, offset: 2}">
            <p class="title">此刻</p>
            <swiper ref="nowSwiper" :options="nowSwiperOptions" class="top-swiper">
              <swiper-slide v-for="(v, index) of nowContent" :key="index" v-if="nowImgShow"><img :src="v.img" style="height: 350px; width: 524px;"></swiper-slide>
              <img :src="nowImg" style="height: 355px; width: 524px;" v-if="nowImg">
            </swiper>
          </el-col>
          <el-col :sm="{span: 9, offset: 2}">
            <div class="left-up-content" v-if="showUpContent">
              <ul>
                <li v-for="(v, index) of nowContent" 
                 :key="index"
                 @mouseover="enterNow(index)"
                 @mouseout="outNow"
                 @click="toHomeDetail(v['id'])">{{v['title']}}</li>
              </ul>
            </div>
          </el-col>
        </el-row>
        <el-row class="left-down">
          <el-col :sm="{span: 7, offset: 2}">
            <p class="title">社团宣传</p>
            <swiper ref="manSwiper" :options="manSwiperOptions" class="down-swiper">
              <swiper-slide v-for="(v, index) of manContent" :key="index" v-if="manImgShow"><img :src="v.img" style="height: 252px; width: 418px;"></swiper-slide>
              <img :src="manImg" style="height: 252px; width: 418px;" v-if="manImg">
            </swiper>
          </el-col>
          <el-col :sm="{span: 10, offset: 2}">
            <div class="left-down-content" v-if="showDownContent">
              <ul>
                <li class="zhuan-lan" @click="toZL">专栏</li>
                <li v-for="(v, index) of manContent" 
                 :key="index"
                 @mouseover="enterMan(index)"
                 @mouseout="outMan">{{v['title']}}</li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :sm="{span: 4}" class="right-content">
        <h5>社团</h5>
        <div class="club">
          <i class="el-icon-video-play"></i><span @click="showClub">我的社团</span>
          <ul v-if="isShowClub">
            <li v-for="(club, index) in myClub" :key="index" @click="showMember(index)">{{club}}</li>
          </ul>
        </div>
        <div class="member">
          <i class="el-icon-user"></i><span>社团成员</span>
          <ul>
            <li v-for="(item, index) in clubMember" :key="index">
              <img :src="host+item.avatar" style="width: 20px; height: 20px">
              {{item.name}}
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import Header from 'components/content/Header';

  import host from 'network/host';
  import { banner, member, connent } from 'network/banner';

  import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper'
  import 'swiper/css/swiper.css'

  export default {
    name: 'Home',
    data() {
      return {
        token: '',
        myClub: [],
        name: '',
        avatar: '',
        isShowClub: false,
        members: {},  // 存放所有社团的成员
        clubMember: [],  // 存放点击某个社团后的特定成员
        nowContent: [],  // 此刻内容
        manContent: [],  // 社团宣传内容
        host: host,
        showUpContent: false,
        showDownContent: false,
        nowSwiperOptions: {
          autoplay: {
            delay: 2000
          },
          loop: true,
          mousewheel: true
        },
        manSwiperOptions: {
          autoplay: {
            delay: 1500
          },
          loop: true,
          mousewheel: true
        },
        nowImg: '',
        nowImgShow: true,
        manImg: '',
        manImgShow: true
      }
    },
    methods: {
      hideMember() {
        this.isHideMember = !this.isHideMember;
      },

      // 点击我的社团，展开/折叠二级菜单
      showClub() {
        this.isShowClub = !this.isShowClub;
      },

      // 显示社团成员
      showMember(index) {
        let club = this.myClub[index];
        this.clubMember = this.members[club];
        // this.isHideMember = !this.isHideMember;
      },

      // 鼠标移入 此刻 文本，显示和文本对应图片
      enterNow(index) {
        this.nowImg = this.nowContent[index]['img'];
        this.nowImgShow = false;
      },
      outNow() {
        this.nowImgShow = true;
        this.nowImg = '';
      },

      // 鼠标移入 社团宣传 文本，显示和文本对应图片
      enterMan(index) {
        this.manImg = this.manContent[index]['img'];
        this.manImgShow = false;
      },
      outMan() {
        this.manImgShow = true;
        this.manImg = '';
      },

      toZL() {
        this.$router.push('/zhuanlan');
      },
      toHomeDetail(id) {
        this.$router.push('/detail/' + id);
      },

      getBanner(token) {
        banner(token).then((res) => {
          this.manContent = res.data.data[0].map((item) => {
            item.img = this.host + item.img
            return item
          });
          if (this.manContent.length != '0') {
            this.showDownContent = true
          }
          this.nowContent = res.data.data[1].map((item) => {
            item.img = this.host + item.img
            return item
          });
          if (this.nowContent.length != '0') {
            this.showUpContent = true
          }
        })
      },
      getMember(token) {
        member(token).then((res) => {
          let data = res.data.data;
          this.myClub = data.community; // 一级社团
          this.clubMember = data.member[this.myClub[0]]; // 默认显示第一个社团成员
          this.avatar = this.host + data.owner.avatar;
          this.name =  data.owner.name;
          this.members = data.member;
          sessionStorage.setItem('is_admin', data.owner.is_admin);
          if (this.myClub.length != 0) { // 保存社团，有则可以使用聊天室
            sessionStorage.setItem('community', this.myClub[0]);
          };
        });
      }
    },
    components: {
      Swiper,
      SwiperSlide,
      'v-header': Header
    },
    mounted() {
      this.getBanner(this.token);
      this.getMember(this.token);
    },
    created() {
      let token = this.$authorization();
      this.token = token;
    }
  }
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
  }

  .content {
    height: calc(100vh - 67px);
  }

  .right-content {
    padding: 10px;
    color: #DEB887;
    height: 100%;
    background-color: #000000;
  }

  .right-content h5 {
    font-size: 24px;
    font-weight: unset;
  }

  .right-content .club, .member {
    font-size: 18px;
    margin-top: 20px;
  }

  .club span, .member span {
    cursor: pointer;
  }

  .club ul, .member ul {
    list-style-type: none;
    text-indent: 2rem;
  }

  .club ul li {
    cursor: pointer;
  }

  .club ul li, .member ul li {
    padding: 5px 0;
    font-size: 15px;
  }

  .left-content {
    color: #c0c0c0;
    height: 100%;
    background-color: rgba(3, 5, 20, 0.8);
  }

  .left-up {
    margin-top: 20px;
  }

  .left-down {
    margin-top: 50px;
  }

  .title {
    text-indent: -2rem;
    padding-bottom: 20px;
  }

  .left-down-content {
    height: 200px;
    overflow: auto;
    color: #DEB887;
  }

  .left-down-content ul {
    list-style-type: none;
  }

  .left-down-content ul li {
    cursor: pointer;
    padding: 10px 0 10px 20px;
  }

  .left-up-content {
    margin-top: 60px;
    height: 300px;
    overflow: auto;
    color: #DEB887;
  }

  .left-up-content ul {
    list-style-type: none;
  }

  .left-up-content ul li {
    cursor: pointer;
    padding: 20px 0 10px 20px;
  }

  .left-down-content .zhuan-lan {
    padding-left: 5px;
    font-size: 23px;
    border-bottom: 1px solid #DEB887;
  }

  .top-swiper {
    width: 524px;
  }

  .down-swiper {
    width: 418px;
  }

  .member img {
    vertical-align: middle;
  }

  .left-up-content ul {
    background-color: #000000;
  }

  .left-down-content {
    margin-top: 50px;
  }

  .left-down-content ul {
    background-color: #000000;
  }
</style>
