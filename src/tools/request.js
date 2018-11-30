import axios from 'axios';
import { baseURL } from '../../config';

// 对axios做了一层简单的封装
const instance = axios.create({
  baseURL,
  timeout: 1e4,
});

// Add a request interceptor
// 可以在config这里做一些配置
instance.interceptors.request.use(config => config,
  error => Promise.reject(error));

// response interceptor
instance.interceptors.response.use(response => response.data,
  error => Promise.reject(error));

export default instance;
