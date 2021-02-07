import request from './request';

export function signout (token) {
  return request({
    url: '/signout/',
    headers: {
      'Authorization': token
    }
  })
}