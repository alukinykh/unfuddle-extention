import React, { Component } from 'react'
import { Router, Route, NavLink, Redirect } from 'react-router-dom'
import { PrivateRoute } from './containers/PrivateRoute'
import { userIsAuthenticated, userIsNotAuthenticated } from "./auth"
import { getProjects } from './api/index'
import { Projects } from './components/projects'
import { Login } from './containers/Login'
import {history} from "./store/index"

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    };
  }

  handleClick = () => {
    getProjects().then(data => this.setState({ title: data[0].title }))
  }

  render() {
    return (
      <Router history={history}>
        <div>
          <ul>
            <li>
              <NavLink exact to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink exact to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink exact to="/milestones">Milestones</NavLink>
            </li>
          </ul>
          <div>
            <Redirect from="/" to="/projects" />
            <Route path="/login" component={Login} />
            <Route exact path="/projects" component={userIsAuthenticated(Projects)} />
            <Route
              path="/milestones"
              component={userIsAuthenticated(() => <div>milestones</div>)}
            />
          </div>
        </div>
      </Router>
    )
  }
}

export default App
