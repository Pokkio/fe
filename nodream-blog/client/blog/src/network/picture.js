import { request } from './http'

/**
 * 获取照片
 */
function getPicture() {
  return request({
    url: '/photos/'
  })
}

export {
  getPicture
}