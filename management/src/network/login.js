import request from './request';

export function login(username, password) {
  return request({
    url: '/login/',
    method: 'POST',
    data: {
      'username': username,
      'password': password,
      'remember': 0
    }
  })
};