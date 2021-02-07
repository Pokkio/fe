import request from './request';

export function avatar(token, form) {
  return request({
    method: 'POST',
    url: '/userinfo/',
    data: form,
    headers: {
      'Authorization': token
    }
  })
}