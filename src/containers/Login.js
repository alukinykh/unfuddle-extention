import React from 'react'
import {Field, reduxForm} from 'redux-form'
import {connect} from 'react-redux'
import {setAuthConfigAction, removeAuthConfigAction} from '../actions/'

const AuthForm = props => {
  const {handleSubmit, pristine, reset, submitting, setAuthConfig, removeAuthConfig, authConfig } = props
  const handleResetForm = () => {
    reset()
    removeAuthConfig()
  }
  return (
    <form onSubmit={handleSubmit((data) => setAuthConfig(data))}>
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
      <button type="submit" disabled={pristine || submitting}>Apply</button>
      <button type="button" disabled={submitting} onClick={handleResetForm}>Reset</button>
    </form>
  )
}

const mapStateToProps = state => ({
  initialValues: state.auth
})

const mapDispatchToProps = dispatch => ({
  setAuthConfig: (data) => dispatch(setAuthConfigAction(data)),
  removeAuthConfig: () => dispatch(removeAuthConfigAction())
})

export const Login = connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: 'authConfig',
})(AuthForm))