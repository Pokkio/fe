import { request } from './http'

/**
 * 获取某一篇文章
 * @param {number} postId 文章id
 */
function getPost(postId) {
  return request({
    url: '/posts/' + postId
  })
};

/**
 * 获取第n页数据(每页10条)
 * @param {number} page 页码
 */
function getPosts(page=null) {
  return request({
    url: '/posts/',
    params: {
      page
    }
  })
}

/**
 * 获取第 postId-1 篇文章数据
 * @param {number} postId
 */
function prevPost(postId) {
  return request({
    url: '/posts/' + (postId - 1)
  })
}

/**
 * 获取第 postId+1 篇文章数据
 * @param {number} postId
 */
function nextPost(postId) {
  return request({
    url: '/posts/' + (parseInt(postId) + 1)
  })
}

export {
  getPost,
  getPosts,
  prevPost,
  nextPost
}