import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import './index.less'

const Account = () => (
  <div className="login">
    <div className="form">
      <div className="logo" />
      <Switch>
        <Route exact={true} path="/login" component={Login} />
        <Route exact={true} path="/register" component={Register} />
      </Switch>
    </div>
  </div>
)

export default Account
