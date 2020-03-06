import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { hot } from 'react-hot-loader/root'

import { store } from './store'
import Main from '@/pages/Main'
import Account from '@/pages/Account'
import '@/styles/global.less'

const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route exact={true} path="/login" component={Account} />
        <Route exact={true} path="/register" component={Account} />
        <Route path="/" component={Main} />
      </Switch>
    </Router>
  </Provider>
)

export default hot(App)
