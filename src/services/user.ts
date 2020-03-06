import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'
import { IResponse } from '@/schemas/common'

const api = {
  getProfile: {
    url: '/api/v1/profile'
  }
}

export const user = {
  async getProfile(data) {
    const res: IResponse = await request(api.getProfile, data)
    if (res && res.code === ERROR_CODE.SUCCESS) {
      return res.data
    }
  }
}
