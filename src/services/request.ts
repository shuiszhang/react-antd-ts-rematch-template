import axios from 'axios'
import { compile } from 'path-to-regexp'
import cookie from 'js-cookie'
import { message } from 'antd'
import mockjs from 'mockjs'

import { IApi } from '@/schemas/common'
import mock from '@/mock'
import { camelJson, underscoreJson, delay } from '@/utils/helpers'
import { ERROR_CODE, ERROR_MESSAGE } from '@/config/errors'

message.config({ maxCount: 1 })
const instance = axios.create({
  // baseURL: process.env.BACKEND_URL,
  timeout: +process.env.REQUEST_TIMEOUT
})

// 发送请求前，对数据进行处理
const processRequest = config => {
  const token = cookie.get('token')
  config.method = config.method || 'GET'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  } else if (
    !config.url.includes('login') &&
    !config.url.includes('register')
  ) {
    // 如果没有取到 token，则跳转到登录页面
    // message.info('请登录')
    // setTimeout(() => {
    //   window.location.href = '/login'
    // }, 1500)
  }

  if (config.data && !(config.data instanceof FormData)) {
    config.data = underscoreJson(config.data)
  }
  if (config.params) {
    config.params = underscoreJson(config.params)
  }

  return config
}

// 请求返回成功后，对返回数据进行处理
const processResponse = response => {
  if (
    response &&
    response.config &&
    response.config.url.includes('api') &&
    response.data
  ) {
    // 统一处理错误码
    if (response.data.code !== ERROR_CODE.SUCCESS) {
      message.error(ERROR_MESSAGE[response.data.code] || '接口请求失败')

      // token 失效
      if (response.data.code === ERROR_CODE.TOKEN_INVALID) {
        message.info(ERROR_MESSAGE[response.data.code])
        window.location.href = '/login'
      }
    }
  }

  if (response && response.data && response.data.data) {
    response.data.data = camelJson(response.data.data)
  }
  return response.data
}

// 请求返回错误后，对错误进行处理
const processResponseError = error => {
  if (error && error.response && error.response.status === 401) {
    if (error.response.config.url.includes('login')) {
      // 登录接口鉴权失败
      return {
        code: ERROR_CODE.TOKEN_INVALID,
        data: {
          token: ''
        }
      }
    } else {
      // 其他接口鉴权失败,即 token 失效
      // window.location.href = '/login'
    }
  } else {
    if (error && error.code === 'ECONNABORTED') {
      // 请求超时
      message.error('接口请求超时，请检查接口是否可用', 0)
    }
    Promise.reject(error)
  }
}

// 对请求进行拦截
instance.interceptors.request.use(
  config => {
    return processRequest(config)
  },
  error => Promise.reject(error)
)

// 对返回进行拦截
instance.interceptors.response.use(
  response => {
    return processResponse(response)
  },
  error => {
    return processResponseError(error)
  }
)

// 生成 mock 数据
const processMock = api => {
  const style1 = 'background:#000;color:#bada55'
  const style2 = 'color:red'

  const rules = mock[api.url]
  if (rules && rules[api.method] && rules[api.method].enabled) {
    console.log('%c准备 mock 请求:', style1)
    console.log(`%c${api.method} ${api.url}`, style2)

    return delay(500).then(() => {
      const res = mockjs.mock(rules[api.method].response)
      console.log('%c生成 mock 数据:', style1)
      console.log(res)
      return camelJson(res)
    })
  }

  return null
}

/**
 * 发送请求
 * /api/v1/foo/bar/:id => request(api.xxx, data, {id: 1})
 * /api/v1/foo/bar?id=1 => request(api.xxx, {id: 1})
 * @param api 对象 {url, method}，见 api.ts
 * @param data 需要发送的数据，可以是 querystring(get) 也可以是 body(post, put, ...)
 * @param urlParams 组成 url 的变量
 * @param options 额外的配置选项，同 axios
 */
const request = (
  api: IApi,
  data?: object,
  urlParams?: object,
  options?: object
) => {
  // 测试接口超时
  /*
  if (api.url === '/api/v1/dashboard') {
    // mocky-delay=20000ms 表示延迟 20s
    return instance.get(
      'http://www.mocky.io/v2/5d4d18f13300004b44337534?mocky-delay=20000ms'
    )
  }
  //*/
  if (process.env.MOCK === '1') {
    // 判断是否使用本地 mock 数据
    const mockResult = processMock(api)
    if (mockResult) {
      return mockResult
    }
  }

  if (urlParams) {
    api = {
      ...api,
      url: compile(api.url)(urlParams)
    }
  }

  let config: any = {
    ...options,
    ...api
  }

  if (/get/i.test(api.method)) {
    config = {
      ...config,
      params: data
    }
  } else {
    config = {
      ...config,
      data
    }
  }

  return instance(config)
}

export { request }
