## 数据驱动视图

- 全局 model
- 不用关心父子模块，将模块之间的联系放到 model 层去维护，更倾向于维护数据而不是维护模块
- 每个模块的改变全部交给 model
- 每个模块无需关注其他模块的变化，只需要关注 model 里面对应自己数据的变化
- 数据流：模块 -> model -> 其他模块

## service/model 职责划分

- 我们倾向于"胖 service"，"瘦 model"
- 数据处理应该放在 service 层进行，model 层只是简单从 service 层拿数据，然后更新到 state
- service 层产生的数据应该能完全满足 model 层的需求

## 新增一个页面

- 在 [modules](../src/pages) 里新增一个页面，页面基础代码可以从 [Empty.tsx](../src/pages/Sample/Empty.tsx) 拷贝
  - [Sample](../src/pages/Sample) 目录也有一些示例页面，通过代码演示了如何使用本项目的技术栈来实现业务
- 在 [navigator](../src/navigator) 里新增导航菜单，有些页面不出现在导航菜单里，则此步省略
- 在 [routers](../src/routers/config.ts) 里新增路由
- 到此一个空页面就完成了，剩下的就是开发具体业务

## 完成页面逻辑

- 在 [models](../src/models) 目录增加对应的数据 model，并在`models/index.ts`里将其导出
  - model 分为三个部分:`state`，`reducers`，`effects`
  - state 是对应页面的数据，一般仅放会变的数据
  - reducers 是一些纯函数，用来改变 state
  - effects 是一些非纯函数，一般会把 ajax 请求放到这里
- 在 [services](../src/services) 目录增加对应的 service，并在`services/index.ts`里将其导出
  - 所有的异步数据请求放在 service 里
  - 所有的对请求回来的数据进行转换，组合等操作也放在 service 里
- 在业务页面里，增加 `mapState` 及 `mapDispath` 将 state, reducer, effect 映射到到 props 里
- 关于 loading
  - 不需要自己额外在 state 里增加 loading 字段
  - model 自带 loading，且分为三个级别
    - `state.loading.global`： 全局 loading
    - `state.loading.models.[modelName]`: 某个 model 对应的 loading
    - `state.loading.effects.[modelName].[funcName]`：某个 reducer/effect 对应的 loading
- 将模块使用`connect`导出

```
// Empty.tsx
import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Dispatch, IRootState } from '@/store'

// 此处映射 model 里面的 state 到 props 上
const mapState = (state: IRootState) => ({
  records: state.user.records,
  loading: state.loading.effects.user.asyncUserList
})

// 此处映射 model 里面的方法(effects, reducers)到 props 上
const mapDispatch = (dispatch: Dispatch) => ({
  userList: dispatch.user.asyncUserList
})

// 此处放外部需要传递进来的 props 属性
interface IEmptyProps
  extends Partial<ReturnType<typeof mapState>>,
    Partial<ReturnType<typeof mapDispatch>> {
  xxx: string
}

// 此处放组件内部的 state
interface IEmptyState {
  name: string
}

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
```
