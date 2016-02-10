import React from 'react'
import { Route, IndexRoute } from 'react-router'
import App from 'App'
import Users from 'App/views/Users'
import User from 'App/views/User'

const routes = (
  <Route path='/' component={App}>
    <IndexRoute component={Users} />
    <Route path='user/:name' component={User} />
  </Route>
)

export default routes
