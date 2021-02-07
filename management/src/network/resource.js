import request from './request';

export function getResource(token) {
  return request({
    url: '/repositories/',
    headers: {
      'Authorization': token,
    }
  })
}

export function uploadResources(token, form) {
  return request({
    url: '/repositories/',
    method: 'POST',
    data: form,
    headers: {
      'Authorization': token,
    }
  })
}