import React, { PureComponent } from 'react'
import { Link, withRouter, RouteComponentProps } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import { pathToRegexp } from 'path-to-regexp'

import menu from '@/navigator'

class Bread extends PureComponent<RouteComponentProps, any> {
  breadcrumbNameMap: any

  constructor(props) {
    super(props)
    this.breadcrumbNameMap = this.genUrlNameMap()
  }

  genUrlNameMap = (routeArr: any = menu, result = {}) => {
    if (routeArr instanceof Array) {
      routeArr.forEach((item) => this.genUrlNameMap(item, result))
    } else if (routeArr instanceof Object) {
      result[routeArr.path] = routeArr.title

      if (routeArr.children) {
        this.genUrlNameMap(routeArr.children, result)
      }
    }

    return result
  }

  render() {
    const pathSnippets = this.props.location.pathname
      .split('/')
      .filter((i) => i)
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      let title = this.breadcrumbNameMap[url]
      if (!title) {
        const tmp = Object.entries(this.breadcrumbNameMap).find((item) =>
          pathToRegexp(item[0]).test(url)
        )
        if (tmp) {
          title = tmp[1]
        }
      }
      if (title) {
        return (
          <Breadcrumb.Item key={url}>
            <Link to={url}>{title}</Link>
          </Breadcrumb.Item>
        )
      }

      return null
    })

    return (
      <Breadcrumb style={{ margin: '16px 0' }}>
        {extraBreadcrumbItems}
      </Breadcrumb>
    )
  }
}

export default withRouter(Bread)
