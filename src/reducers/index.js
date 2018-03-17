import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { auth } from './auth'
import { projects } from './projects'

export default combineReducers({
  auth,
  projects,
  form: formReducer,
  routing: routerReducer
})
