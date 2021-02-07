const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',   // 提示compression-webpack-plugin@3.0.0的话asset改为filename
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240, // 只处理大于10240字节的文件
        minRatio: 0.8 // 压缩比例
      }),
      // new BundleAnalyzerPlugin()
    ],
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('common', resolve('src/common'))
      .set('network', resolve('src/network'))
      .set('views', resolve('src/views'))
      .set('store', resolve('src/store'))
    config.optimization.minimize(true), // 压缩代码
    config.optimization.splitChunks({ // 分割代码
      chunks: 'all'
    }),
    config.externals(
      {
        'vue': 'Vue',
        'vue-router': 'VueRouter',
        'axios': 'axios',
        'element-ui': 'ELEMENT',
        'highlight.js': 'hljs'
      }
    );
  }
}