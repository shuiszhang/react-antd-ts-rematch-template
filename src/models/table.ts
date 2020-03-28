import { createModel } from '@rematch/core'
import * as services from '../services'

export const table = createModel({
  state: {
    records: [],
    pagination: {
      current: 0,
      pageSize: 15,
      total: 0,
    },
    modalVisible: false,
    tableDetail: {
      name: '',
      time: '',
      info1: '',
      info2: '',
    },
  },

  reducers: {
    // 在这里写纯函数来改变 state

    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },

    hideModal(state, _payload) {
      return {
        ...state,
        modalVisible: false,
      }
    },
  },

  effects: () => ({
    // 在这里写"不纯"的函数，比如 ajax 请求获取数据
    // 异步请求必须放在此处

    // 获取表格数据
    async asyncTableList(payload?) {
      const result = await services.table.tableList(payload)
      this.updateState(result)
    },

    // 删除用户
    async asyncTableDelete(payload) {
      const result = await services.table.tableDelete(payload)
      if (result) {
        this.asyncTableList()
      }
    },

    // 获取用户详情
    async asyncTableDetail(payload) {
      const result = await services.table.tableDetail({
        tableId: payload.tableId,
      })
      this.updateState(result)
    },
  }),
})
