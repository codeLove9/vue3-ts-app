import axios from 'axios'
import { AxiosInstance } from 'axios'
import Cookie from 'js-cookie'

const request: AxiosInstance = axios.create({
  baseURL: "http://120.24.64.5:8088/mall-admin",
  timeout: 15000
})

request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    let token = Cookie.get("token")
    if(token) {
      config.headers = config.headers || {}
      config.headers.Authorization = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

export default request
