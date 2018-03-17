import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  setAuthConfigAction,
  removeAuthConfigAction,
  requestProjects
} from '../actions/'

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
  } = props
  const handleResetForm = () => {
    reset()
    removeAuthConfig()
  }
  const handleLogin = data => {
    setAuthConfig(data)
    getProjects()
  }
  return (
    <Form as="form" onSubmit={handleSubmit(handleLogin)}>
      <span>{projects.error ? projects.error : ''}</span>
      <Form.Field
        as="FormField"
        control={Field}
        name="username"
        type="text"
        component="input"
        placeholder="Username"
        label="Username"
      />
      <Form.Field
        as="FormField"
        control={Field}
        name="password"
        type="password"
        component="input"
        placeholder="Password"
        label="Password"
      />
      <Form.Field
        as="FormField"
        control={Field}
        name="subdomain"
        type="text"
        component="input"
        placeholder="Subdomain"
        label="Subdomain"
      />
      <Button type="submit" disabled={pristine || submitting}>Login</Button>
    </Form>

    // <form >
    //   <span>{projects.error ? projects.error : ''}</span>
    //   <div>
    //     <Field
    //       name="username"
    //       type="text"
    //       component={Input}
    //       placeholder="Username"
    //     />
    //   </div>
    //   <div>
    //     <Field
    //       name="password"
    //       type="password"
    //       component={Input}
    //       placeholder="Password"
    //     />
    //   </div>
    //   <div>
    //     <Field
    //       name="subdomain"
    //       type="text"
    //       component={Input}
    //       placeholder="Subdomain"
    //     />
    //   </div>
    //   <button type="submit" disabled={pristine || submitting}>
    //     Apply
    //   </button>
    //   <button type="button" >
    //     Reset
    //   </button>
    // </form>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth,
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  setAuthConfig: data => dispatch(setAuthConfigAction(data)),
  removeAuthConfig: () => dispatch(removeAuthConfigAction()),
  getProjects: () => dispatch(requestProjects())
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'authConfig'
})(AuthForm))
