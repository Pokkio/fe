module.exports = {
  plugins: {
    "postcss-px-to-viewport": {
      viewportWidth: 375, // 设计稿的宽度(iphone6设备物理像素)
      viewportHeight: 667,
      unitPrecision: 5, // 指定px转换为视窗单位值的小数位数(很多时候无法整除)
      viewportUnit: 'vw', // 指定需要转换成的视窗单位
      selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'], // 指定不需要转换的类
      minPixelValue: 1, // 小于或等于不用转换
      mediaQuery: false // 允许在媒体查询中转换px
    }
  }
};