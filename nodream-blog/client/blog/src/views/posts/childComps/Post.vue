<template>
  <div class="post">

    <!--页面头部开始-->
    <header
      class="header"
      :style="{ background: isSelectColor }"
    >
      <div @click="handleShowComments">comments</div>
    </header>
    <!--页面头部结束-->
      
      <!--评论功能开始-->
      <el-dialog
        title="HAPPY TO MEET YOU"
        :visible.sync="showComments"
      >
        <comments />
      </el-dialog>
      <!--评论功能结束-->
      
      <Loading :is-loading="isLoading" />
  
      <el-row>
        <!--上篇文章功能开始-->
        <el-col
          :sm="{span: 2, offet: 2}"
          class="prev">
          <el-tooltip
            :content=prevInfo.prevTitle
            placement="top"
          >
            <router-link
              :to=prevInfo.prevLink
            >
              <el-button
                v-if="prevInfo.prev == true"
              >prev
              </el-button>
            </router-link>
          </el-tooltip>
        </el-col>
        <!--上篇文章功能结束-->

        <!--下篇文章功能开始-->
        <el-col
          :sm="{span: 2, offet: 18}"
          class="next"
        >
          <el-tooltip
            :content=nextInfo.nextTitle
            placement="top">
            <router-link
              :to=nextInfo.nextLink
            >
              <el-button
                v-if="nextInfo.next == true"
              >next
              </el-button>
            </router-link>
          </el-tooltip>
        </el-col>
        <!--下篇文章功能结束-->

        <!--文章内容区域开始-->
        <el-col
          :xs="24"
          :sm="{span: 12, offset: 1}"
          class="post-content"
        >

          <el-scrollbar>
            <vue-markdown
              class="article"
              v-if="post"
              :source="post.body"
              :toc="false"
              @toc-rendered="handleGetToc"
            ></vue-markdown>
          </el-scrollbar>
        </el-col>
        <!--文章内容区域结束-->
      </el-row>

      <!--返回文章列表页开始-->
      <div
        class="back-page"
        @click="handleBackPage"
      >
        <i class="el-icon-back"></i>
      </div>
      <!--返回文章列表页结束-->

  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown';
  import { getPost, prevPost, nextPost } from 'network';
  import { Loading, Comments } from 'components/common';

  export default {
    name: 'Post',

    data() {
      return {
        isLoading: false,
        post: null,
        prevInfo: { // 前一篇文章
          prev: false,
          prevTitle: null,
          prevLink: '0'
        },
        nextInfo: { // 后一篇文章
          next: false,
          nextTitle: null,
          nextLink: '0'
        },
        toc: null,
        showComments: false // 显示评论
      }
    },

    components: {
      VueMarkdown,
      Loading,
      Comments
    },

    computed: {
      isSelectColor() {
        return this.$mutations.getColor()
      }
    },

    created() {
      this.fetchData()
    },

    mounted() {
      try {
        this.getPrevPost(),
        this.getNextPost(),
        this.handleGetToc()
      } catch (err) {
        console.error(err)
      }
    },

    // 监听路由变化
    watch: {
      '$route': ['fetchData', 'getPrevPost', 'getNextPost'],
    },

    methods: {
      // 获取文章数据
      fetchData() {
        this.post = null
        this.isLoading = true
        getPost( this.$route.params.id ).then(res => {
          if ( res != 404 ) {
            this.isLoading = false
            this.post = res.data
            document.title = 'No-Dream | ' + this.post.title
          } else {
            this.$router.push('/')
          }
        }).catch(err => {
          this.isLoading = false
        });
      },

      // 提取文章toc

      
      // 获取上一篇数据
      getPrevPost() {
        if ( this.$route.params.id != 1 ) {
          this.prevInfo.prev = true
          prevPost(this.$route.params.id).then(res => {
            this.prevInfo.prevTitle = '上一篇: ' + res.data.title;
            this.prevInfo.prevLink = String(this.$route.params.id - 1)
          })
        } else {
          this.prevInfo.prev = false
        }
      },

      // 获取下一篇数据
      getNextPost() {
        nextPost(this.$route.params.id).then(res => {
          if ( res == 404 ) {
            this.nextInfo.next = false
          } else {
            this.nextInfo.nextTitle = '下一篇: ' + res.data.title
            this.nextInfo.nextLink = String(parseInt(this.$route.params.id) + 1)
            this.nextInfo.next = true
          }
        })
      },

      // 回到来时的列表页
      handleBackPage() {
        let pageNumber = this.$mutations.getCurrentPage()
        this.$router.push('/posts/' + pageNumber)
      },

      // 捕获渲染markdown目录事件
      handleGetToc(payload) {
        this.toc = payload
      },

      // 处理评论
      handleShowComments() {
        this.showComments = !this.showComments
      }
    }
  }
</script>

<style scoped>
  html {
    background-color: #f6f6f6;
    font-size: 15px;
    color: #212121;
    line-height: 1.5;
  }

  .post {
    height: 100%;
  }

  header {
    position: absolute;
    width: 100%;
    height: 100px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    font-size: 20px;
    color: #fff;
  }

  header div {
    margin: 10px;
    padding: 5px;
    position: fixed;
    z-index: 2;
    cursor: pointer;
    border-radius: 5px;
  }

  header div:hover {
    color: #3f51b5;
    background-color: #fff;
  }

  .el-row {
    height: 100%;
  }

  .post-content {
    background-color: #fff;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    min-height: 100px;
    margin-top: 50px;
    padding: 30px;
    height: 90%;
    position: relative;
  }

  .el-scrollbar {
    height: 100%;
    overflow-x: hidden;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
    height: 100%;
  }

  .post-toc {
    position: fixed;
    top: 200px;
    right: 500px;
  }

  .post-toc h4 {
    color: #727272;
    font-size: 15px;
  }

  .navbar {
    display: flex;
    position: absolute;
    z-index: 2;
  }

  .home, .category, .tags, .about {
    padding: 10px;
  }

  .link {
    color: #fff;
    border-radius: 4px;
    font-size: 18px;
    padding: 2px 7px;
    display: inline-block;
    text-decoration: none;
    transition: all .4s;
  }

  .link:hover {
    background-color: #fff;
    color: #3f51b5;
  }

  .prev, .next {
    height: 100%;
    transform: translate(50%, 50%);
  }

  .back-page {
    font-size: 40px;
    position: absolute;
    left: 80px;
    bottom: 80px;
    cursor: pointer;
  }

  .el-icon-back {
    color: #000000;
    background-color: #ffffff;
    transition: all .6s;
  }

  .el-icon-back:hover {
    transform: translateX(20px);
    color: #ffffff;
    background-color: #000000;
  }

  @media only screen and (max-width: 767px) {
    .prev {
      display: none;
    }
    .back-page {
      display: none;
    }
    .post-content {
      height: 98%;
    }
  }
</style>