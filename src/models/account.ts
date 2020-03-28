import { createModel } from '@rematch/core'

import * as services from '../services'

export const account = createModel({
  state: {
    token: '',
    isLogin: false,
    isRegister: false,
  },

  reducers: {
    // 在这里写纯函数来改变 state

    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  effects: () => ({
    // 在这里写"不纯"的函数，比如 ajax 请求获取数据
    // 异步请求必须放在此处

    async asyncLogin(payload) {
      const result = await services.account.login(payload)
      this.updateState(result)
    },

    async asyncRegister(payload) {
      const result = await services.account.register(payload)
      this.updateState(result)
    },
  }),
})
