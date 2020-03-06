import React, { useState, useEffect } from 'react'
import loadable from '@loadable/component'

// 按需加载 loading 效果
const Loading = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true)
    }, 200)
    return () => clearTimeout(timer)
  })

  if (loading) {
    return (
      <div className="ball-beat">
        <div />
        <div />
        <div />
      </div>
    )
  } else {
    return null
  }
}

const AsyncComponent = loadable(
  props => import(/* webpackPrefetch: true */ `@/pages/${props.path}`),
  {
    fallback: <Loading />
  }
)

const Loadable = path => () => <AsyncComponent path={path} />

export default Loadable
