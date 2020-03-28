import { request } from '@/services/request'
import { ERROR_CODE } from '@/config/errors'

const api = {
  submit: {
    url: '/api/v1/form',
    method: 'post',
  },
}

export const form = {
  async submit(data) {
    let result = false

    const response: any = await request(api.submit, data)
    if (response && response.code === ERROR_CODE.SUCCESS) {
      console.log('todo')
      result = true
    }

    return result
  },
}
