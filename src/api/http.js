import axios from "axios"
import router from "../router"
import Vue from 'vue'
import {Message, Loading } from 'element-ui'
import Cookies from 'js-cookie'
let loadingServer
// 超时时间
axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = '/'
  // axios.defaults.baseURL = 'api/'
} else if (process.env.NODE_ENV === "production"){
  axios.defaults.baseURL = '/'
}
// 允许axios携带cookie
axios.defaults.withCredentials = true
// http请求拦截器
axios.interceptors.request.use(
  config => {
    loadingServer = Loading.service()
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// http响应拦截器
axios.interceptors.response.use(
  response => {
    loadingServer.close()
    return response
  },
  error => {
    loadingServer.close()
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误"
          break
        case 401:
          error.message = "未授权，请登录";
          // sessionStorage.removeItem('token')
          Cookies.remove('access_token')
          router.push({
            name: 'login'
          })
          break
        case 403:
          error.message = "拒绝访问"
          break
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`
          Message.error(error.response.config.url)
          break
        case 408:
          error.message = "请求超时"
          Message.error('请求超时')
          break
        case 500:
          error.message = "服务器内部错误"
          Message.error('服务器内部错误')
          break
        case 501:
          error.message = "服务未实现"
          break
        case 502:
          error.message = "网关错误"
          break
        case 503:
          error.message = "服务不可用"
          break
        case 504:
          error.message = "网关超时"
          Cookies.remove('access_token')
          router.push({
            name: "login"
          })
          // window.sessionStorage.removeItem("token")
          break
        case 505:
          error.message = "HTTP版本不受支持"
          break
      }
    }
    return Promise.reject(error)
  }
)
export default {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      let token = window.sessionStorage.getItem("token")
      if (token) {
     
      axios
          .get(url,{ params:params})
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      } else {
        axios
          .get(url, {params})
          .then(response => {
            resolve(response.data)
          })
          .catch(err => {
            reject(err)
          })
      }
    })
  },
  post: (url, data, headers) => {
    return new Promise((resolve, reject) => {
      axios
        .post(
          url,
          data
        )
        .then(
          response => {
            resolve(response.data)
          },
          err => {
            reject(err)
          }
        )
    })
  },
  delete: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .delete(url,  { params }, {
          withCredentials: true
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  patch: (url, data) => {
    return new Promise((resolve, reject) => {
      axios
        .patch(url, data, )
        .then(
          response => {
            resolve(response.data)
          },
          err => {
            reject(err)
          }
        )
    })
  },
  put: (url, data) => {
    return new Promise((resolve, reject) => {
      axios.put(url, data).then(
        response => {
          resolve(response.data)
        },
        err => {
          reject(err)
        }
      )
    })
  }
}
