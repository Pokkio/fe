import axios from 'axios'

/**
 * 封装axios
 * @param {object} config 
 */
export function http(config) {
  const _ = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    timeout: 3000,
    headers: {
      token: config['token']
    }
  });

  _.interceptors.request.use(config => {
    return config
  }, err => {})

  _.interceptors.response.use(res => {
    return res
  }, err => {})

  return _(config)
}
