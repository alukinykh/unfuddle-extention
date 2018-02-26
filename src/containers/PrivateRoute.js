import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  projects: state.projects.projects,
  ...state.auth
});

export const PrivateRoute = withRouter(
  connect(mapStateToProps)(
    ({
      component: Component,
      username,
      password,
      subdomain,
      projects,
      ...rest
    }) => (
      <Route
        {...rest}
        render={props =>
          username && password && subdomain ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: '/login'
              }}
            />
          )
        }
      />
    )
  )
);
