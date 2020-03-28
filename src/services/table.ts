import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'
import { IResponse } from '@/schemas/common'

const api = {
  tableList: {
    url: '/api/v1/table/query',
    method: 'get',
  },
  tableDelete: {
    url: '/api/v1/table/delete',
    method: 'post',
  },
  tableDetail: {
    url: '/api/v1/table/detail/:tableId',
    method: 'get',
  },
}

export const table = {
  async tableList(data) {
    let result = {
      records: [],
      pagination: {
        current: 0,
        total: 0,
      },
    }

    const response: IResponse = await request(api.tableList, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        ...response.data,
      }
    }

    return result
  },

  async tableDelete(data) {
    let result = false

    const response: IResponse = await request(api.tableDelete, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = true
    }

    return result
  },

  async tableDetail(urlParams, data?) {
    let result = {
      modalVisible: false,
      tableDetail: {
        name: '',
        time: '',
      },
    }

    const response: IResponse = await request(api.tableDetail, data, urlParams)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = {
        modalVisible: true,
        tableDetail: response.data,
      }
    }

    return result
  },
}
