import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Loadable from './loadable'

export const renderRouter = (config) => {
  return Object.entries(config).map((item: any) => {
    const props: any = {
      exact: true,
      path: item[0],
    }

    if (item[1] instanceof Object) {
      if (item[1].exact === false) {
        props.exact = false
      }

      if (item[1].component) {
        props.component = Loadable(item[1].component)
      }

      if (item[1].redirect) {
        props.render = () => <Redirect to={item[1].redirect} />
      }
    } else {
      props.component = Loadable(item[1])
    }

    return <Route {...props} key={props.path} />
  })
}

export * from './config'
