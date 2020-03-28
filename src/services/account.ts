import cookie from 'js-cookie'

import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'
import { IResponse } from '@/schemas/common'

const api = {
  login: {
    url: '/api/v1/account/login',
    method: 'post',
  },
  register: {
    url: '/api/v1/account/register',
    method: 'post',
  },
}

export const account = {
  async login(data) {
    let result = {
      token: '',
      isLogin: false,
    }

    const response: IResponse = await request(api.login, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        token: response.data.token,
        isLogin: true,
      }

      cookie.set('token', result.token)
    }

    return result
  },

  async register(data) {
    let result = {
      isRegister: false,
    }

    const response: IResponse = await request(api.register, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        isRegister: true,
      }
    }

    return result
  },
}
