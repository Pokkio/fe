<template>
  <div class="order">
    <el-row>
      <el-col :span="6" class="pos-order">
        <el-tabs>
          <el-tab-pane label="点餐">
            <el-table :data="tableData">
              <el-table-column prop="goodsName" label="商品名称"></el-table-column>
              <el-table-column prop="count" label="数量"></el-table-column>
              <el-table-column prop="price" label="金额"></el-table-column>
              <el-table-column prop="actions" label="操作" fixed="right">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="addOrderList(scope.row)">增加</el-button>
                  <el-button type="text" size="small" @click="delOrderList(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="total">
              <span>数量: </span><span>{{totalCount}}</span>
              <span>总价: </span><span>￥{{totalPrice}}</span>
            </div>
            <div class="action-btn">
              <el-button type="warning">挂单</el-button>
              <el-button type="danger">删除</el-button>
              <el-button type="success" @click="checkOut">结账</el-button>
            </div>
          </el-tab-pane>

          <el-tab-pane label="挂单">
            挂单
          </el-tab-pane>

          <el-tab-pane label="外卖">
            外卖
          </el-tab-pane>
        </el-tabs>
      </el-col>

      <el-col :span="18">
        <div class="hot-goods">
          <p class="title">热门商品</p>
          <div class="hot-goods-item clearfix">
            <ul>
              <li v-for="goods in hotGoods" :key="goods.goodsId" @click="addOrderList(goods)">
                <span>{{goods.goodsName}}</span>
                <span class="goods-price">￥{{goods.price}}</span>
              </li>
              </li>
            </ul>
          </div>
        </div>

        <div class="goods-type">
          <el-tabs>
            <el-tab-pane label="汉堡">
              <ul class='cookList'>
                <li v-for="goods in type0Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img src="~assets/img/placeholder.png" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="小食">
              <ul class='cookList'>
                <li v-for="goods in type1Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img src="~assets/img/placeholder.png" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="饮料">
              <ul class='cookList'>
                <li v-for="goods in type2Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img src="~assets/img/placeholder.png" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane label="套餐">
              <ul class='cookList'>
                <li v-for="goods in type3Goods" @click="addOrderList(goods)">
                    <span class="foodImg"><img src="~assets/img/placeholder.png" width="100%"></span>
                    <span class="foodName">{{goods.goodsName}}</span>
                    <span class="foodPrice">￥{{goods.price}}元</span>
                </li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </div>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getHotGoods } from 'network/hotGoods';
  import { getTypeGoods } from 'network/typeGoods';

  export default {
    name: 'Order',
    data() {
      return {
        tableData: [],
        hotGoods: [],
        type0Goods:[],
        type1Goods:[],
        type2Goods:[],
        type3Goods:[]
      }
    },
    created() {
      // 获取热门商品
      getHotGoods().then(res => {
        this.hotGoods = res.data['oftenGoods'];
      });
      // 获取分类商品
      getTypeGoods().then(res => {
        let data = res.data;
        this.type0Goods = data.data[0];
        this.type1Goods = data.data[1];
        this.type2Goods = data.data[2];
        this.type3Goods = data.data[3]
      })
    },
    methods: {
      addOrderList(goods) {
        // 商品是否已存在列表中
        let isExist = false;
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].goodsId === goods.goodsId) {
            this.tableData[i].count += 1;
            isExist = true;
          }
        }
        // 不存在就添加购物车
        if (!isExist) {
          let newGoods = {
            'goodsId': goods.goodsId,
            'goodsName': goods.goodsName,
            'price': goods.price,
            'count': 1
          }
          this.tableData.push(newGoods);
        }
      },
      delOrderList(goods) {
        this.tableData = this.tableData.filter(item => item.goodsId != goods.goodsId);
      },
      checkOut() {
        // 结账
        if (this.tableData.length != 0) {
          this.tableData = [];
          this.$message({
            'message': '结账成功！',
            'type': 'success'
          })
        } else this.$message({'message': '目前无购买商品！'})
      }
    },
    computed: {
      totalCount() {
        return this.tableData.reduce((pre, goods) => {
          return pre + goods.count;
          } , 0)
      },
      totalPrice() {
        return this.tableData.reduce((pre, goods) => {
          return pre + goods.count * goods.price;
        }, 0)
      }
    }
  }
</script>

<style scoped>
  .pos-order {
    background-color: #F9FAFC;
    border-right: 1px solid #C0CCDA;
    height: 100vh;
  }

  .action-btn {
    margin-top: 10px;
    text-align: center;
  }

  .hot-goods .title {
    height: 20px;
    border-bottom: 1px solid #D3dce6;
    background-color: #F9FAFC;
    padding: 15px 0;
    padding-left: 15px;
  }

  .hot-goods-item ul li {
    list-style-type: none;
    float: left;
    border: 1px solid #C0CCDA;
    padding: 10px;
    margin: 15px;
    background-color: #ffff;
    cursor: pointer;
  }

  .hot-goods-item .goods-price {
    color: #58B7FF;
  }

  .clearfix::after {
    display: table;
    content: " ";
    clear: both;
  }

  .cookList li{
    list-style: none;
    width:20%;
    border:1px solid #E5E9F2;
    height: auot;
    overflow: hidden;
    background-color:#fff;
    padding: 2px;
    float:left;
    margin: 2px;
    margin-left: 20px;
   }

  .cookList li span{
    display: block;
    float:left;
  }

  .foodImg{
    width: 40%;
  }

  .foodName{
    font-size: 18px;
    padding-left: 15px;
    color:brown;
  }

  .foodPrice{
    font-size: 16px;
    padding-left: 30px;
    padding-top:10px;
  }

  .total {
    background-color: #fff;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: 1px solid #E5E9F2;
  }

  .total span {
    margin-right: 10px;
  }
</style>