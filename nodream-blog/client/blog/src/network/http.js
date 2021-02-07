/**
 * axios 实例
 * @param {Object} config 配置
 */
export function request(config) {
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 5000
  })

  instance.interceptors.request.use(config => {
    if ( config.method === 'get' ) {}
    else if ( config.method === 'post' ) {}
    return config
  })

  instance.interceptors.response.use(res => {
    return res
  }, err => {
    return err;
  })

  return instance(config);
}