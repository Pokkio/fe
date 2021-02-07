import BackTop from 'components/content/backTop/BackTop';
import { debounce } from 'common/utils';

export const itemListenerMixin = {
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemListener = () => {
      newRefresh();
    };
    this.$bus.$on('itemImageLoaded', this.itemListener);
  }
};

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowToTop: false
    }
  },
  methods: {
    // methods不是生命周期函数，所以会覆盖同名方法，不会合并
    toTop() {
      this.$refs.scroll.scrollTo(0, 0, 300);
    },
    showToTop(position) {
      this.isShowToTop = position.y <= -1000
    }
  }
};