import { request } from './request';

export function getTypeGoods() {
  return request({
    url: '/typeGoods'
  });
}