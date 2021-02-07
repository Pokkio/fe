<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" 
                    :is-check="isCheckAll" @click.native="checkClick" />
      <span>全选</span>
    </div>
    <div class="price">
      合计：{{totalPrice}}
    </div>
    <div class="items-count" @click="calcClick">
      去计算 ({{itemsCount}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton';
  import { mapGetters } from 'vuex';

  export default {
    name: 'CarBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['carList']),
      totalPrice() {
        return this.carList.filter(item => {
          return item.checked;
        }).reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0).toFixed(2) + '￥';
      },
      itemsCount() {
        return this.carList.filter(item => {
          return item.checked;
        }).length;
      },
      isCheckAll() {
        // 全部选中
        return this.carList.every(item => item.checked == true);
      }
    },
    methods: {
      checkClick() {
        if (this.isCheckAll) {
          this.carList.forEach(item => item.checked = false);
        } else { // 部分未选中或全部选中
          this.carList.forEach(item => item.checked = true);
        }
      },
      calcClick() {
        if (!this.isCheckAll) {
          this.$toast.show('请选择购买的商品', 2000);
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    height: 40px;
    background-color: #fff;
    display: flex;
    font-size: 16px;
  }

  .check-content {
    width: 75px;
    display: flex;
  }

  .check-button {
    margin-top: 10px;
    margin-left: 5px;
    height: 20px;
  }

  .check-content span {
    margin: 12px 0 0 8px;
  }

  .price {
    line-height: 40px;
    text-align: center;
    flex: 1;
  }
  
  .items-count {
    line-height: 40px;
    width: 100px;
    text-align: center;
    color: #fff;
    background-color: var(--color-high-text);
  }
</style>