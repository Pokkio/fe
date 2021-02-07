<<template>
  <div class="tab-bar-item" @click="changeClick">
    <slot v-if="!isActive" name="item-icon"></slot>
    <slot v-else name="item-icon-active"></slot>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor}: {}
    }
  },
  methods: {
    changeClick() {
      this.$router.push(this.path);
    }
  },
}
</script>
<style scoped>
  .tab-bar-item {
    font-size: 15px;
    flex: 1; /*宽度均等分*/
    text-align: center;
    height: 49px; /*大多数tarbar都是49px*/
    font-weight: 600;
  }
  .tab-bar-item img {
    height: 23px;
    width: 23px;
    margin-top: 3px;
    vertical-align: middle;
  }
  .active {
    color: red;
  }
</style>
