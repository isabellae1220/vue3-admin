import axios from 'axios'
import { ElMessage } from 'element-plus'
import config from '@/config'

const service = axios.create({
  baseURL: config.baseApi,
})

const NETWORK_ERROR = '网络错误'

// 请求拦截器
service.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    const { code, data, msg } = res.data
    if (code === 200) {
      return data
    } else {
      ElMessage.error(msg || NETWORK_ERROR)
      return Promise.reject(msg || NETWORK_ERROR)
    }
  }
)

function request(options: any) {
  // 1. 默认 GET
  options.method = options.method || 'get'
  //      ↑ 改成 method,没有 s

  // 2. GET 请求参数处理(把 data 放到 params)
  if (options.method.toLowerCase() === 'get') {
    //                ↑ 改成 toLowerCase,L 后面是小写 o
    options.params = options.data
  }

  // 3. mock 开关处理
  let isMock = config.mock
  if (typeof options.mock !== 'undefined') {
    isMock = options.mock
  }

  // 4. 环境处理
  if (config.env === 'prod') {
    // 生产环境强制用 baseApi(防止误用 mock)
    service.defaults.baseURL = config.baseApi
  } else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }

  return service(options)
  // ⚠️ 删掉重复的那行 return!
}

export default request