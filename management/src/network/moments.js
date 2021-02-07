import request from './request';

export function getMoments(token) {
  return request({
    url: '/friend_circle/',
    headers: {
      'Authorization': token,
    }
  })
};

export function uploadMoment(token, form) {
  return request({
    url: '/friend_circle/',
    method: 'POST',
    data: form,
    headers: {
      'Authorization': token,
    }
  })
}