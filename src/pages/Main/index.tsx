import React, { Component } from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import moment from 'moment'
import { ConfigProvider, Layout } from 'antd'
import antZhCN from 'antd/lib/locale-provider/zh_CN'

import { renderRouter, mainRouters } from '@/routers'
import HeaderBar from '@/components/HeaderBar'
import SideMenu from '@/components/SideMenu'
import Bread from '@/components/Bread'
import { Page403, Page404, Page500 } from '@/components/ErrorPage'

const { Content } = Layout

export default class Main extends Component<null, null> {
  antLocale: any

  constructor(props) {
    super(props)
    this.initLocale()
  }

  initLocale = () => {
    this.antLocale = antZhCN
    moment.locale('zh-cn')
  }

  render() {
    return (
      <ConfigProvider locale={this.antLocale}>
        <Layout style={{ height: '100%' }}>
          <SideMenu />
          <Layout>
            <HeaderBar />
            <Content style={{ margin: '58px 20px' }}>
              <Bread />
              <Switch>
                {renderRouter(mainRouters)}
                <Route path="/403" component={Page403} />
                <Route path="/404" component={Page404} />
                <Route path="/500" component={Page500} />
                <Redirect to="/404" />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    )
  }
}
