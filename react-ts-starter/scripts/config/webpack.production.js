/*
 * @Description:
 * @Author: Pokkio
 * @Date: 2021-02-18 18:52:33
 * @LastEditTime: 2021-02-18 19:21:06
 * @LastEditors: Pokkio
 */
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const base = require('./webpack.base.js')

module.exports = merge(base, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
})
