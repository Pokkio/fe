import { http } from './http'
import qs from 'qs'

const TOKEN = 'token'

/**
 * 获取地区
 */
export function getLocation() {
  return http({
    url: '/location',
    token: TOKEN
  })
}

/**
 * 根据地区获取门店
 * @param {string} area 地区
 * @return {object}
 */
export function getShops(area=null) {
  return http({
    url: '/shops',
    method: 'POST',
    token: TOKEN,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({
      area
    })
  })
}