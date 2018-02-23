import React, {Component} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import {PrivateRoute} from "./containers/PrivateRoute"
import { getProjects } from './api/index'
import { Projects } from "./components/projects"
import {Login} from './containers/Login'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: ''
    }
  }

  handleClick = () => {
    getProjects()
      .then((data) => this.setState({title: data[0].title}))
  }

  render() {
    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/">Projects</Link>
            </li>
            <li>
              <Link to="/milestones">Milestones</Link>
            </li>
          </ul>
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Projects}/>
          <PrivateRoute path="/milestones" component={() => (<div>milestones</div>)} />
        </div>
      </Router>
    )
  }
}

export default App
