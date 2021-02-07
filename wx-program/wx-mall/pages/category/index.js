import { request } from '../../request/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContentList: [],
    // 当前左侧菜单被选中的索引
    currentIndex: 0,
    // 重置右边内容每次滚动后点击左侧菜单后返回顶部
    scrollTop: 0
  },

  // 当前商品数据
  cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 本地缓存，超过5分钟重新发起请求
    const Cates = wx.getStorageSync('cates')
    if ( !Cates ) {
      this.getCates()
    } else {
      if ( Date.now() - Cates.time > 1000 * 60 * 5) {
        this.getCates()
      } else {
        this.cates = Cates.data
        let leftMenuList = this.cates.map(item => item.cat_name)
        let rightContentList = this.cates[0].children
        this.setData({
          leftMenuList,
          rightContentList
        })
      }
    }
  },

  // 获取分类数据
  getCates() {
    request({
      url: '/categories'
    }).then(result => {
      this.cates = result
      // 数据缓存到本地
      wx.setStorageSync('cates', {
        time: Date.now(),
        'data': this.cates
      })
      let leftMenuList = this.cates.map(item => item.cat_name)
      // 默认获取显示数组第一个类别数据
      let rightContentList = this.cates[0].children
      this.setData({
        leftMenuList,
        rightContentList,
      })
    })
  },

  // 左侧菜单点击事件
  handleMenuTap(e) {
    const { index } = e.currentTarget.dataset
    let rightContentList = this.cates[index].children
    this.setData({
      currentIndex: index,
      rightContentList,
      scrollTop: 0
    })
  }
})