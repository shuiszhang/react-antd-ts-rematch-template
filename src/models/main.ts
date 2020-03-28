import { createModel } from '@rematch/core'

export const main = createModel({
  state: {
    collapsed: false,
  },

  reducers: {
    // 在这里写纯函数来改变 state

    updateState(state, payload) {
      return {
        ...state,
        ...payload,
      }
    },

    toggleCollapsed(state) {
      return {
        ...state,
        collapsed: !state.collapsed,
      }
    },
  },
})
