<template>
    <el-row>
      <el-col :xs="xs" :sm="sm">

        <div class="post-item">
          <div class="post-meta">
            <span class="created_time">{{createTime}}</span>
          </div>

          <h3 class="post-title">
            <router-link 
              :to="{ path: '/post/' + data.id }"
              class="post-title-link"
            >
              {{data.title}}
            </router-link>
          </h3>

          <div class="post-excerpt">
            {{data.excerpt}}
            <router-link 
              :to="{ path: '/post/' + data.id }"
            >阅读更多...</router-link>
          </div>
          
          <div class="post-footer" v-if="data.tags.length">
            <ul class="post-footer-ul">
              <li
                v-for="tag in data.tags"
                :key="tag"
              >
                <a
                  href="javascript:;"
                  class="tag"
                >{{tag}}</a>
              </li>
            </ul>
          </div>

        </div>

      </el-col>
      
    </el-row>
</template>

<script>
  export default {
    name: 'PostItem',
    
    props: {
      // 文章基本数据
      data: {
        type: Object,
        default() {
          return {}
        }
      },
      // element-ui 框架响应式
      xs: {
        type: Number,
        default() {
          return 24
        }
      },
      sm: {
        type: Number,
        default() {
          return 13
        }
      }
    },

    computed: {
      // 文章创建时间
      createTime() {
        return this.data.created_time.split(' ')[0]
      },
      // 文章阅读次数
      views() {
        return this.data.views + '次阅读'
      }
    }
  }
</script>

<style scoped>
  .post-item {
    opacity: .9;
    box-sizing:border-box;
    background-color: #ffffff;
    margin-bottom: 30px;
    border-radius: 4px;
    box-shadow: 0px 8px 16px #d3d2d2;
    transition: all .5s;
    padding: 16px 20px;
    text-align: left;
  }

  .post-meta {
    font-size: 13px;
    margin: 0 0 6px;
    line-height: 14px;
    font-weight: bold;
    color: #727272;
  }

  @media only screen and (min-width: 767px) {
    .post-item:hover {
      transform: translateX(100px) scale(1.2);
    }
  }

  /* .post-item:hover {
    transform: translateX(100px) scale(1.2);
  } */

  .post-title {
    margin: 0 0 16px;
    cursor: pointer;
  }

  .post-excerpt {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .post-excerpt a {
    color: #8bc34a;
    text-decoration: none;
  }

  .post-title-link {
    color: #3f51b5;
    text-decoration: none;
  }

  .post-footer {
    border-top: 2px solid #ddd;
    width: 100%;
  }

  .post-footer-ul {
    height: 40px;
    display: flex;
  }

  .post-footer-ul li:nth-child(odd) {
    height: 22px;
    font-size: 15px;
    margin: 8px 10px 5px 0px;
    background-color: #8bc34a;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    padding: 5px 6px;
    transition: 0.2s ease-in-out;
  }

  .post-footer-ul li:nth-child(even) {
    height: 22px;
    font-size: 15px;
    margin: 8px 10px 5px 0px;
    background-color: #673ab7;
    color: rgba(255, 255, 255, 0.8);
    border-radius: 2px;
    padding: 5px 6px;
    transition: 0.2s ease-in-out;
  }

  .post-footer-ul .tag {
    display: inline-block;
    height: 100%;
    color: #ffffff;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    outline: none;
    text-align: center;
    padding: 3px;
  }

  .post-footer-ul li:hover {
    color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.26);
  }
</style>