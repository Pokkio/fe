import request from './request';

export function getMessage(token, community) {
  return request({
    url: '/chat/',
    params: {
      community,
    },
    headers: {
      'Authorization': token,
    }
  })
};


export function sendMessage(token, message) {
  return request({
    url: '/chat/',
    method: 'POST',
    data: message,
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json'
    }
  })
};

export function uploadImg(token, form) {
  return request({
    url: '/chat/',
    method: 'POST',
    data: form,
    headers: {
      'Authorization': token,
    }
  })
}

export function getNotice(token, community) {
  return request({
    url: '/notice/',
    params: {
      community,
    },
    headers: {
      'Authorization': token
    }
  })
};

export function uploadNotice(token, community, content) {
  return request({
    url: '/notice/',
    method: 'POST',
    data: {
      community,
      content
    },
    headers: {
      'Authorization': token
    }
  })
};