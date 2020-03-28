import { createModel } from '@rematch/core'

import * as services from '../services'

export const form = createModel({
  state: {},

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

    async asyncSubmit(payload) {
      const result = await services.form.submit(payload)
      console.log(result)
    },
  }),
})
