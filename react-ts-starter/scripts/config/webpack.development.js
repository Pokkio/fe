/*
 * @Description:
 * @Author: Pokkio
 * @Date: 2021-02-18 18:50:02
 * @LastEditTime: 2021-02-18 19:12:56
 * @LastEditors: Pokkio
 */
const { merge } = require('webpack-merge')

const base = require('./webpack.base.js')
const { SERVER_HOST, SERVER_PORT } = require('../constants')

module.exports = merge(base, {
  mode: 'development',
  devServer: {
    host: SERVER_HOST, // 指定 host，不设置的话默认是 localhost
    port: SERVER_PORT, // 指定端口，默认是8080
    stats: 'errors-only', // 终端仅打印 error
    clientLogLevel: 'silent', // 日志等级
    compress: true, // 是否启用 gzip 压缩
    open: true, // 打开默认浏览器
    hot: true, // 热更新
  },
})
