import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import {
  setAuthConfigAction,
  removeAuthConfigAction,
  requestProjects
} from '../actions/';

const AuthForm = props => {
  const {
    handleSubmit,
    projects,
    pristine,
    reset,
    submitting,
    setAuthConfig,
    removeAuthConfig,
    authConfig,
    getProjects
  } = props;
  const handleResetForm = () => {
    reset();
    removeAuthConfig();
  };
  const handleLogin = data => {
    setAuthConfig(data);
    getProjects();
  };
  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <span>{projects.error ? projects.error : ''}</span>
      <div>
        <Field
          name="username"
          type="text"
          component="input"
          placeholder="Username"
        />
      </div>
      <div>
        <Field
          name="password"
          type="password"
          component="input"
          placeholder="Password"
        />
      </div>
      <div>
        <Field
          name="subdomain"
          type="text"
          component="input"
          placeholder="Subdomain"
        />
      </div>
      <button type="submit" disabled={pristine || submitting}>
        Apply
      </button>
      <button type="button" disabled={submitting} onClick={handleResetForm}>
        Reset
      </button>
    </form>
  );
};

const mapStateToProps = state => ({
  initialValues: state.auth,
  projects: state.projects
});

const mapDispatchToProps = dispatch => ({
  setAuthConfig: data => dispatch(setAuthConfigAction(data)),
  removeAuthConfig: () => dispatch(removeAuthConfigAction()),
  getProjects: () => dispatch(requestProjects())
});

export const Login = connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'authConfig'
  })(AuthForm)
);
