import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Dispatch, IRootState } from '@/store'

// 此处放外部需要传递进来的 props 属性
interface IEmptyProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  table: string // 如果需要
}

// 此处放组件内部的 state
interface IEmptyState {
  name: string
}

// 此处映射 model 里面的 state 到 props 上
const mapState = (state: IRootState) => ({
  records: state.table.records,
  loading: state.loading.effects.table.asyncTableList
})

// 此处映射 model 里面的方法(effects, reducers)到 props 上
const mapDispatch = (dispatch: Dispatch) => ({
  tableList: dispatch.table.asyncTableList
})

class Empty extends Component<IEmptyProps, IEmptyState> {
  constructor(props) {
    super(props)
    this.state = {
      name: '示例页面'
    }
  }

  render() {
    return <div>{this.state.name}</div>
  }
}

export default connect(
  mapState,
  mapDispatch
)(Empty)
