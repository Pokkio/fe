import request from './request';

export function register(form) {
  return request({
    method: 'POST',
    url: '/register/',
    data: form
  })
};

export function communityList() {
  return request({
    url: '/community_list/'
  })
}