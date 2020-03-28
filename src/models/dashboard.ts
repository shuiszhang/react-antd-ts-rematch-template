import { createModel } from '@rematch/core'

import * as services from '../services'

export const dashboard = createModel({
  state: {
    points: [],
    points2: [],
  },

  reducers: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  effects: () => ({
    async asyncGetData(payload?) {
      const result = await services.dashboard.getData(payload)
      this.updateState(result)
    },
  }),
})
