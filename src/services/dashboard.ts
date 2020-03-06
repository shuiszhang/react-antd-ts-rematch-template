import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'
import { IResponse } from '@/schemas/common'

const api = {
  dashboard: {
    url: '/api/v1/dashboard',
    method: 'get'
  }
}

export const dashboard = {
  async getData(data?) {
    let result = {
      points: []
    }

    const response: IResponse = await request(api.dashboard, data)
    console.log('res:', response)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      result = response.data
    }

    return result
  }
}
