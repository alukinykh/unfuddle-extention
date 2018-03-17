import React, { Component } from 'react'
import { Router, Route, NavLink, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { userIsAuthenticated, userIsNotAuthenticated } from './auth'
import { Projects } from './components/projects'
import { Login } from './containers/Login'
import { history } from './store/index'
import { removeAuthConfigAction } from './actions/index'

class App extends Component {
  state = { activeItem: 'projects' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  handleLogout = (e, { name }) => {
    this.setState({ activeItem: name })
    this.props.removeAuthConfig()
  }

  render() {
    const { activeItem } = this.state
    return (
      <Router history={history}>
        <div>
          <Menu secondary>
            <Menu.Item
              as={NavLink}
              exact
              to="/projects"
              name="projects"
              active={activeItem === 'projects'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              as={NavLink}
              exact
              to="/milestones"
              name="milestones"
              active={activeItem === 'milestones'}
              onClick={this.handleItemClick}
            />
            <Menu.Menu position="right">
              <Menu.Item name="logout" active={activeItem === 'logout'} onClick={this.handleLogout} />
            </Menu.Menu>
          </Menu>
          <Switch>
            <Route path="/login" component={userIsNotAuthenticated(Login)} />
            <Route path="/projects" component={userIsAuthenticated(Projects)} />
            <Route
              path="/milestones"
              component={userIsAuthenticated(() => <div>milestones</div>)}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  removeAuthConfig: () => dispatch(removeAuthConfigAction())
})

export default connect(null, mapDispatchToProps)(App)
