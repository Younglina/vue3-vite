import Axios from 'axios'
import { ElMessage } from 'element-plus'
import { getCookie } from '@/utils/useTool.js'
// const baseURL = process.env.NODE_ENV === 'production'?import.meta.env.VITE_APP_NETEASE_API_URL:'http://localhost:3000/'

const axios = Axios.create({
  baseURL: 'https://vue3-yesplay.vercel.app/api',
  withCredentials: true,
  timeout: 20000, // 请求超时 20s
})

// 前置拦截器（发起请求之前的拦截）
axios.interceptors.request.use(
  config => {
    /**
     * 根据你的项目实际情况来对 config 做处理
     * 这里对 config 不做任何处理，直接返回
     */
    if (!config.params) config.params = {}
    config.params.cookie = `MUSIC_U=${getCookie('MUSIC_U')};`
    return config
  },
  error => {
    return Promise.reject(error)
  },
)

// 后置拦截器（获取到响应时的拦截）
axios.interceptors.response.use(
  response => {
    /**
     * 根据你的项目实际情况来对 response 和 error 做处理
     * 这里对 response 和 error 不做任何处理，直接返回
     */
    if (response.data.code !== 200) {
      ElMessage.error(
        `Code: ${response.data.code}, Message: ${response.data.msg}`,
      )
    } else {
      return response.data
    }
  },
  error => {
    if (error.response && error.response.data) {
      const code = error.response.status
      const msg = error.response.data.message
      ElMessage.error(`Code: ${code}, Message: ${msg}`)
    } else {
      ElMessage.error(`${error}`)
    }
    return Promise.reject(error)
  },
)

export default axios