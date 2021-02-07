import axios from 'axios';

export function request(config) {
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000/api/m3',
      timeout: 5000
    });

    // 实例请求拦截
    instance.interceptors.request.use(config => {
      return config; // 必须返回
    }, err => {
      
    });
    // 实例响应拦截
    instance.interceptors.response.use(res => {
      return res.data;
    }, err => {
      console.log(err);
    });

    // 发送请求
    return instance(config);
}