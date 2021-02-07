import { request } from './request';

export function getHotGoods() {
  return request({
    url: '/oftenGoods'
  });
}