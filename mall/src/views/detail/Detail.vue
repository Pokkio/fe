<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="navbar" />
    <scroll class="content" ref="scroll" :probe-type="3"
    @scrollPosition="scrollPosition" >
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" ref="param" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommends" />
    </scroll>
    <detail-bottom-bar @addCar="addCar" />
    <back-top @click.native="toTop" v-show="isShowToTop" />
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar';
  import DetailSwiper from './childComps/DetailSwiper';
  import DetailBaseInfo from './childComps/DetailBaseInfo';
  import DetailShopInfo from './childComps/DetailShopInfo';
  import DetailGoodsInfo from './childComps/DetailGoodsInfo';
  import DetailParamInfo from './childComps/DetailParamInfo';
  import DetailCommentInfo from './childComps/DetailCommentInfo';
  import DetailBottomBar from './childComps/DetailBottomBar';

  import { getDetail, getRecommends, Goods, ShopC, GoodsParam } from 'network/detail';
  import { itemListenerMixin, backTopMixin } from 'common/mixin';
  import { debounce } from 'common/utils';
  import { mapActions } from 'vuex';

  import Scroll from 'components/common/scroll/Scroll';
  import GoodsList from 'components/content/goods/GoodsList';

  export default {
    name: 'Detail',
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: [],
        itemListener: null,
        themeTopY: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList
    },
    mixins: [itemListenerMixin, backTopMixin],
    methods: {
      ...mapActions({
        addCarActions: 'addCar'
      }),
      imageLoad() {
        this.$refs.scroll.refresh();
        this.getThemeTopY();
      },
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 100);
      },
      scrollPosition(position) {
        this.showToTop(position);
        const positionY = -position.y; // 正数
        const themeLength = this.themeTopY.length;
        for (let i = 0; i < this.themeTopY.length - 1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopY[i] && positionY <= this.themeTopY[i+1])) {
            this.currentIndex = i;
            this.$refs.navbar.currentIndex = i;
          }
        }
      },
      addCar() {
        const product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        this.addCarActions(product).then(res => {
          this.$toast.show(res);
        }).catch(res => {
          this.$toast.show(res);
        });
      }
    },
    created() {
      // 获取商品id
      this.iid = this.$route.params.iid;
      // 获取详情页数据
      getDetail(this.iid).then(res => {
        const data = res.result;
        // 商品轮播图数据
        this.topImages = data.itemInfo.topImages;
        // 商品基本信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
        // 店铺信息
        this.shop = new ShopC(data.shopInfo);
        // 商品基本数据
        this.detailInfo = data.detailInfo;
        // 商品参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
        // 评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0];
        };
      });
      // 获取推荐数据
      getRecommends().then(res => {
        this.recommends = res.data.list;
      });
      // 给获取各组件高度函数包装防抖函数
      this.getThemeTopY = debounce(() => {
        this.$nextTick(() => {
          this.themeTopY = [];
          this.themeTopY.push(0);
          this.themeTopY.push(this.$refs.param.$el.offsetTop + 30);
          this.themeTopY.push(this.$refs.comment.$el.offsetTop + 30);
          this.themeTopY.push(this.$refs.recommends.$el.offsetTop + 30);
          this.themeTopY.push(Number.MAX_VALUE);
        });
      }, 100);
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 1;
    background-color: #fff;
    height: 100vh;
  }

  .nav-bar {
    position: relative;
    z-index: 1;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }
</style>