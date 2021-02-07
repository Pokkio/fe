import request from './request';

export function work(token, title, community, content) {
  return request({
    url: '/homework/',
    method: 'POST',
    data: {
      title,
      community,
      content
    },
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
};

export function getWork(token) {
  return request({
    url: '/homework/',
    method: 'GET',
    headers: {
      'Authorization': token
    }
  })
}