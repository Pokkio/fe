<template>
  <div class="posts">
    <!--loading图-->
    <Loading :is-loading="loading" />

    <el-row>

      <!--左边导航栏开始-->
      <el-col :xs="0" :sm="3">
        <el-aside>
          <NavAside />
        </el-aside>
      </el-col>
      <!--左边导航栏结束-->
      
      <!--列表区域开始-->
      <el-col
        :xs="24"
        :sm="{span: 21, offset: 0}"
      >

        <el-container>

          <el-scrollbar style="height: 100%">

            <!--文章列表开始-->
            <el-main>
              <ul>
                <li
                  v-for="data in postsData"
                  :key="data"
                >
                  <post-item :data="data"></post-item>
                </li>
              </ul>

              <!--分页区域开始-->
              <el-col
                :xs="24"
                :sm="{span: 13, offset: 0}"
              >
                <el-pagination
                  :current-page="currentPage"
                  :total="total"
                  background
                  :page-size="pageSize"
                  :hide-on-single-page="hidePageNumber"
                  @current-change="handleCurrentChange"
                  layout="prev, pager, next"
                >
                </el-pagination>
              </el-col>
              <!--分页区域结束-->

            </el-main>
            <!--文章列表结束-->

          </el-scrollbar>

          <!--页面底部-->
          <el-footer>
            <Footer />
          </el-footer>
          <!--页面结束-->

        </el-container>
      </el-col>
      <!--列表区域开始-->

      <!--分类区域开始-->
      <el-col :xs="0">
        <el-scrollbar class="category-col">
          
          <!--分类区域列表开始-->
          <div
            class="category-item"
            v-for="item in category"
            :key="item"
            @click="showCategory(item)"
          >
            {{item[0] + ' (' + item[1].length + ')'}}
          </div>
          <!--分类区域列表结束-->

          <!--分类文章对话框开始-->
          <el-dialog
            :title="categoryTitle"
            :visible.sync="showCategoryDialog">

            <div
              class="category-content"
              v-for="item in categoryData"
              :key="item"
            >
              <router-link 
                :to="{ path: '/post/' + item.id}"
                class="category-link"
              >
                {{item.title}}
              </router-link>
            </div>
          </el-dialog>
          <!--分类文章对话框结束-->

        </el-scrollbar>
      </el-col>
      <!--分类区域结束-->

    </el-row>
  </div>
</template>

<script>
  import { getPost, getPosts } from 'network'

  import { NavAside, Footer } from 'components/content'
  import { Loading } from 'components/common'

  import PostItem from './childComps/PostItem'

  export default {
    name: 'Posts',

    data() {
      return {
        postsData: [], // 文章列表数据
        total: 0, // 总页数
        currentPage: 1, // 当前页码
        pageSize: 10, // 每页文章数
        hidePageNumber: true, // 是否隐藏页码
        category: [], // 分类数据
        categoryTitle: '', // 类别名称
        categoryData: [], 
        showCategoryDialog: false, // 显示分类列表
        loading: false // 显示loading
      }
    },

    components: {
      NavAside,
      Footer,
      PostItem,
      Loading
    },
    
    created() {
      // 判断路由到第n页
      this.getPostsData(this.$route.params.page)
      this.currentPage = parseInt(this.$route.params.page)
    },

    methods: {
      // 格式化时间
      formatDate(date) {
        let d = new Date(date)
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
      },

      // 获取当前页码的文章数据
      getPostsData(page) {
        this.loading = true
        Promise.all([
          getPosts(1),
          getPosts(2)
        ]).then(res => {
          this.loading = false
          this.category = []
          let cm = new Object() // 目录
          let newRes = [...res[0].data.results, ...res[1].data.results]
          for (let post of newRes) {
            post.created_time = this.formatDate(post.created_time)

            // 构造分类数据
            if (post.category) {
              if (cm[post.category]) {
                cm[post.category].push(post.id)
              } else {
                cm[post.category] = [];
                cm[post.category].push(post.id)
              }
            }
          }
          // 添加文章数据
          for (let v in cm) {
            this.category.push([v, cm[v]])
          }

          this.postsData = newRes.reverse() // 翻转数组，日期最新的在队列前面
          this.total = newRes.length
          this.postsData = this.postsData.slice((page - 1) * 10, page * 10) // 根据页码切割
        }).catch(err => {
          this.loading = false
        })
      },

      // 获取分类数据
      getCategoryData() {
        Promise.all([
          getPosts(1),
          getPosts(2)
        ]).then(res => {
          let cm = new Object();
          res.map(item => {
            for (let post of item.data.results) {
            // 构造分类数据
              if (post.category) {
                if (cm[post.category]) {
                  cm[post.category].push(post.id)
                } else {
                  cm[post.category] = [];
                  cm[post.category].push(post.id)
                }
              }
            }
            
          })
          for (let v in cm) {
            this.category.push([v, cm[v]])
          }
        })
      },

      // 页码改变
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        this.$mutations.setCurrentPage(currentPage)
        this.$router.push('/posts/' + currentPage)
        this.getPostsData(this.$route.params.page)
      },

      // 跳转到目录
      showCategory(item) {
        this.categoryTitle = item[0]
        this.showCategoryDialog = true
        this.categoryData = []
        for (let id of item[1]) {
          getPost(id).then((res) => {
            this.categoryData.push({title: res.data.title, id: res.data.id})
          })
        }
      }
    }
  }
</script>

<style>
  .posts {
    height: 100%;
  }

  .el-container {
    height: 100%;
  }

  .el-footer {
    color: #000000;
    text-align: center;
    height: 35px !important;
    box-shadow: 4px 0px 5px #c0c0c0;
  }
  
  .el-row > div {
    height: 100%;
  }

  .el-aside {
    height: 100%;
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    box-shadow: 4px 0px 5px #c0c0c0;
    width: 100% !important;
  }
  
  .el-main {
    color: #333;
    text-align: center;
  }

  .el-main ul {
    margin: 0;
    padding: 0;
  }

  .el-main li {
    list-style-type: none;
  }

  .el-row {
    height: 100%;
  }

  .el-row .el-container {
    height: 100%;
  }

  .el-scrollbar {
    height: 100%;
    overflow: hidden;
  }

  .el-scrollbar__wrap {
    overflow-x: hidden;
    height: 100%;
  }

  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #3f51b5;
  }

  .category-col {
    position: absolute;
    top: 10%;
    right: 12%;
    width: 280px;
    height: 300px;
    overflow: auto;
    overflow-x: hidden;
    border-radius: 5px;
  }

  .category-item {
    cursor: pointer;
    padding: 10px;
    font-size: 16px;
    color: #8bc34a;
    display: inline-block;
    transition: all .5s;
  }

  .category-item:hover {
    color: #ffffff;
    background-color: #8bc34a;
    border-radius: 5px;
    box-shadow: 4px 0px 5px #c0c0c0;
  }

  .el-scrollbar__view {
    padding: 10px;
    transition: all .5s;
  }

  .category-content {
    text-align: center;
  }

  .category-link {
    display: inline-block;
    padding: 5px;
    color: #3f51b5;
    text-decoration: none;
    font-size: 18px;
    border-radius: 4px;
  }

  .category-link:hover {
    background-color: #8bc34a;
    color: #ffffff;
  }
</style>