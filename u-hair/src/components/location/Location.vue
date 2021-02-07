<template>
  <div class="location">
    <div class="select">
      <div class="input1">请选择你的定位</div>
      <span class="space">|</span>
      <div class="input2">
        <van-field
          v-model="location"
          placeholder="请输入门店"
          maxlength="8"
          @click="isShowLocation = !isShowLocation" />
      </div>
    </div>

    <div class="map">
      <van-icon
        name="map-marked"
        @click="isShowLocation = !isShowLocation" />
      <!-- <img src="../../assets/img/location/map.png" alt=""> -->
    </div>

    <van-overlay
    :show="isShowLocation">
      <van-tree-select
      :items="allLocation"
      :active-id.sync="allLocationActiveId"
      :main-active-index.sync="allLocationActiveIndex"
      @navclick="_handleClickLocationNav"
      @itemclick="_handleClickLocationItem" />
    </van-overlay>
    
  </div>
</template>

<script>
  import { getLocation } from 'api'

  export default {
    name: 'Location',

    data() {
      return {
        location: '', // 选中的地区
        isShowLocation: false, // 是否显示选择地区的组件
        allLocation: [],
        allLocationActiveId: 0, // 区域下标
        allLocationActiveIndex: 0, // 地市下标
      }
    },

    created() {
      this._getLocation()
    },

    watch: {
      // 监控区域变化
      location(area) {
        // if ( !this.location.indexOf('广州') ) return 
        // else {
          this.$emit('area', area);
        // }
      }
    },

    methods: {
      // 获取地区
      _getLocation() {
        getLocation().then((res) => {
          let { data, msg } = res['data']
          if ( msg != 'success' ) Notify({ type: 'danger', message: msg })
          for ( let item in data ) {
            let locationData = new Object()
            locationData['text'] = item
            locationData['children'] = data[item]
            this.allLocation.push(locationData)
          }
        })
      },

      // 点击选择地区左边导航
      _handleClickLocationNav(index) {
        this.allLocationActiveIndex = index
      },

      // 点击选择地区右边选项
      _handleClickLocationItem(data) {
        this.location = this.allLocation[this.allLocationActiveIndex]['text'] + data['text']
        this.isShowLocation = !this.isShowLocation
      }
    }
  }
</script>

<style lang="scss" scoped>
  .location {
    display: flex;
    position: relative;
    z-index: 2;
    top: -15px;
    width: 340px;
    margin: 0 5%;
    padding: 10px;
    background-color: #ffffff;
    border-radius: 5px;
    box-shadow: 0 3px 3px #8d8b8b;
    font-size: 15px;

    .select {
      flex: 1;
      display: flex;
      border: 1px solid #8b8989;
      border-radius: 20px;
      padding: 5px 5px;
      line-height: 30px;

      .space {
        margin: 0 10px;
      }

      .input1 {
        color: pink;
        font-size: 12px;
      }

      .input2 {
        flex: 1;
      }

      .van-cell {
        padding: 0;
        line-height: 30px;
      }
    }

    .map {
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .van-overlay {
      display: flex;
      align-items: center;
      justify-content: center;

      .van-tree-select {
        width: 80%;
      }
    }
  }
</style>