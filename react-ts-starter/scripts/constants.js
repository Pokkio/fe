/*
 * @Description: 项目配置常量
 * @Author: Pokkio
 * @Date: 2021-02-18 18:55:23
 * @LastEditTime: 2021-02-18 19:11:46
 * @LastEditors: Pokkio
 */
const isDevelopment = process.env.NODE_ENV !== 'production'
const SERVER_HOST = '127.0.0.1'
const SERVER_PORT = 9000

module.exports = {
  isDevelopment,
  SERVER_HOST,
  SERVER_PORT,
}
