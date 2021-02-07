<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
                  @tabClick="tabClick" ref="tabControl1"
                  class="tab-control" v-show="isTabControl1Show" />
    <scroll class="content" ref="scroll" :probe-type="3"
            @scrollPosition="scrollPosition" :pull-up-load="true"
            @loadMore="loadMore">
      <home-swiper :banner="banner" @swiperLoad="swiperLoad" />
      <home-recommend :recommend="recommend" />
      <home-feature />
      <tab-control :titles="['流行', '新款', '精选']" 
                  @tabClick="tabClick" ref="tabControl" />
      <goods-list :goods="showGoods"/>
    </scroll>
    <back-top @click.native="toTop" v-show="isShowToTop" />
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';
import TabControl from 'components/content/tabControl/TabControl';
import GoodsList from 'components/content/goods/GoodsList';

import HomeSwiper from './childComps/HomeSwiper';
import HomeRecommend from './childComps/HomeRecommend'
import HomeFeature from './childComps/HomeFeature';

import { getHomeMultidata, getHomeGoods } from 'network/home';
import { itemListenerMixin, backTopMixin } from 'common/mixin';


export default {
  name: 'Home',
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    HomeRecommend,
    HomeFeature,
  },
  data() {
    return {
      banner : [],
      recommend: [],
      goods: {
        'pop': {page: 0, list: []}, // 流行
        'new': {page: 0, list: []}, // 新款
        'sell': {page: 0, list: []} // 精选
      },
      currentType: 'pop',
      tabControlOffsetTop: 0, // 判断tabcontronl是否可吸顶
      isTabControl1Show: false,
      saveY: -0, // 保存离开首页时的纵坐标
      itemListener: null
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    }
  },
  mixins: [itemListenerMixin, backTopMixin],
  methods: {
    /* 事件监听 */
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop';
          break;
        case 1:
          this.currentType = 'new';
          break;
        case 2:
          this.currentType = 'sell';
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
    },
    scrollPosition(position) {
      // 判断 回到顶部 是否显示
      this.showToTop(position);

      // tabControl 是否吸顶
      this.isTabControl1Show = (-position.y) >= this.tabControlOffsetTop;
    },
    loadMore() {
      this.newgetHomeGoods(this.currentType);
    },
    swiperLoad() {
      this.tabControlOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },

    /* 网络请求 */
    newgetHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banner = res.data.banner.list;
        this.recommend = res.data.recommend.list;
      })
    },
    newgetHomeGoods(type) {
      const nowPage = this.goods[type].page + 1;
      getHomeGoods(type, nowPage).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        this.$refs.scroll.finishPullUp();
      })
    }    
  },
  created() {
    // 请求轮播图数据
    this.newgetHomeMultidata();
    // 请求商品数据
    this.newgetHomeGoods('pop');
    this.newgetHomeGoods('new');
    this.newgetHomeGoods('sell');
  },
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTo(0, this.saveY, 0);
  },
  deactivated() {
    // 离开首页时取消对全局图片加载事件的监听
    this.$bus.$off('itemImageLoaded', this.itemListener);
    this.saveY = this.$refs.scroll.scroll.y;
  }
}
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }

  .tab-control {
    position: relative;
    z-index: 1;
  }

  .content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
</style>