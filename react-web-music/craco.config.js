/**
 *
 * @format
 * @Description: 扩展webpack配置文件
 * @Author: Pokkio
 * @Date: 2020-11-25 22:27:26
 * @LastEditTime: 2020-11-27 21:12:44
 * @LastEditors: Pokkio
 */

// eslint-disable-next-line @typescript-eslint/no-require-imports
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

module.exports = {
  webpack: {
    // 别名
    alias: {
      '@': resolve('src'),
      components: resolve('src/components'),
    },
  },
}
