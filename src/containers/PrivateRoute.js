import React, {Component} from 'react'
import {
  Route,
  Redirect
} from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'

const mapStateToProps = state => ({...state.auth})


export const PrivateRoute = withRouter(connect(mapStateToProps)(({ component: Component, username, password, subdomain, ...rest }) => (
    <Route
      {...rest}
      render={props =>
        username && password && subdomain ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  )
))