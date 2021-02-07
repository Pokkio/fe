import { request } from '../../request/index'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: [],
    // 导航
    catesList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 轮播图
    this.getSwiperData()
    // 导航
    this.getCatesData()
    // 楼层
    this.getFloorData()
  },

  // 请求轮播图数据
  getSwiperData() {
    request({
      url: '/home/swiperdata'
    }).then(result => {
      this.setData({
        swiperList: result
      })
    })
  },
  // 请求分类数据
  getCatesData() {
    request({
      url: '/home/catitems'
    }).then(result => {
      this.setData({
        catesList: result
      })
    })
  },
  // 请求楼层数据
  getFloorData() {
    request({
      url: '/home/floordata'
    }).then(result => {
      this.setData({
        floorList: result
      })
    })
  },
})