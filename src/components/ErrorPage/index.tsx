import React from 'react'
import { withRouter } from 'react-router-dom'
import { Result, Button } from 'antd'

const Page403 = withRouter((props) => (
  <Result
    status={403}
    title="403"
    subTitle="你没有权限访问此页面"
    extra={
      <Button type="primary" onClick={() => props.history.push('/')}>
        返回首页
      </Button>
    }
  />
))

const Page404 = withRouter((props) => (
  <Result
    status={404}
    title="404"
    subTitle="你访问的页面不存在"
    extra={
      <Button type="primary" onClick={() => props.history.push('/')}>
        返回首页
      </Button>
    }
  />
))

const Page500 = withRouter((props) => (
  <Result
    status={500}
    title="500"
    subTitle="服务器发生错误"
    extra={
      <Button type="primary" onClick={() => props.history.push('/')}>
        返回首页
      </Button>
    }
  />
))

export { Page403, Page404, Page500 }
