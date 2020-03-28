import * as services from '../services'

export const user = {
  state: {},
  reducer: {
    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: () => ({
    async getProfile(payload) {
      const res = await services.user.getProfile(payload)
      this.updateState(res.data)
    },
  }),
}
