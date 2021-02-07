import request from './request';


export function banner(token) {
  return request({
    url: '/banner/',
    headers: {
      'Authorization': token
    }
  })
};

export function member(token) {
  return request({
    url: '/community_member/',
    headers: {
      'Authorization': token
    }
  })
};

export function connent(id) {
  return request({
    url: '/get_connent/',
    params: {
      id
    }
  })
}