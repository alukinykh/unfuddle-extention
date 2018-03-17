import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { userIsNotAuthenticated, userIsAuthenticated } from '../auth'
import { Login } from '../containers/Login'
import { Projects } from '../components/projects'

const Routes = () => (
  <Switch>
    <Route path="/login" component={userIsNotAuthenticated(Login)} />
    <Route path="/projects" component={userIsAuthenticated(Projects)} />
    <Route
      path="/milestones"
      component={userIsAuthenticated(() => <div>milestones</div>)}
    />
  </Switch>
)

export default Routes
