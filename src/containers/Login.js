import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Form, Input, Button } from 'semantic-ui-react'
import { connect } from 'react-redux'
import {
  removeAuthConfigAction,
  requestProjects
} from '../actions/'

const renderInput = (props) => (
  <Form.Field
    as="FormField"
    control={Input}
    {...props}
  />
)

const AuthForm = props => {
  const {
    handleSubmit,
    projects,
    pristine,
    reset,
    submitting,
    removeAuthConfig,
    getProjects
  } = props
  const handleResetForm = () => {
    reset()
    removeAuthConfig()
  }
  const handleLogin = data => {
    getProjects(data)
  }
  return (
    <Form as="form" onSubmit={handleSubmit(handleLogin)}>
      <span>{projects.error ? projects.error : ''}</span>
      <Field
        name="username"
        type="text"
        placeholder="Username"
        label="Username"
        component={renderInput}
      />
      <Field
        as="FormField"
        name="password"
        type="password"
        placeholder="Password"
        label="Password"
        component={renderInput}
      />
      <Field
        as="FormField"
        name="subdomain"
        type="text"
        placeholder="Subdomain"
        label="Subdomain"
        component={renderInput}
      />
      <Button type="submit" disabled={pristine || submitting}>Login</Button>
    </Form>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth,
  projects: state.projects
})

const mapDispatchToProps = dispatch => ({
  removeAuthConfig: () => dispatch(removeAuthConfigAction()),
  getProjects: (data) => dispatch(requestProjects(data))
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'authConfig'
})(AuthForm))
