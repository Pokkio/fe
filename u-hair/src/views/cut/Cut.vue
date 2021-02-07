<template>
  <div class="cut">

    <swipe />
    <location
      ref="location"
      @area="getArea" />
    <scroll
      class="shops-content"
      ref="scroll"
      :pro-type="3" >
      
      <barber-item
        v-if="lastBarberInfo"
        :barber="lastBarberInfo" />
      <shop :shops="shops" />
    </scroll>
    <tab-bar />
  </div>
</template>

<script>
  import Swipe from 'components/swipe/Swipe'
  import Location from 'components/location/Location'
  import Scroll from 'components/scroll/Scroll'
  import TabBar from 'components/TabBar/TabBar'
  import BarberItem from 'components/barber/BarberItem'
  import Shop from 'components/shop/Shop'

  import { getShops } from 'api'

  export default {
    name: 'Cut',

    components: {
      Swipe,
      Location,
      Scroll,
      Shop,
      TabBar,
      BarberItem
    },

    data() {
      return {
        shops: [],
        lastBarberInfo: { // 上次关顾的理发师
          point: 98,
          name: 'Afa',
          price: 48,
          person: 2,
          last: true, // 是否显示可关闭按钮
        }
      }
    },

    computed: {},
    watch: {},

    created() {
      this._getShops()
    },

    mounted() {},

    methods: {
      // 获取地区门店信息（默认是广州）
      _getShops() {
        getShops('广州').then((res) => {
          let { data, msg } = res['data']
          if ( msg != 'success' ) Notify({ type: 'danger', message: msg })
          for ( let item of data ) {
            this.shops.push(item)
          }
        })
      },

      // 获取子组件location的input值
      getArea(area) {
        let nowArea = !area.indexOf('广州') ? '广州': '深圳'
        getShops(nowArea).then((res) => {
          this.shops = []
          let { data, msg } = res['data']
          if ( msg != 'success' ) Notify({ type: 'danger', message: msg })
          for ( let item of data ) {
            this.shops.push(item)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cut {
    background: #f8f8f8;
    height: 100vh;

    .shops-content {
      height: calc(100% - 415px);
      overflow: hidden;

      .shops {
        border-top: 1px solid #eee;
      }
    }
  }
</style>