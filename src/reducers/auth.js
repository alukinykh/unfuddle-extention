import { getAuthConfig } from '../api/index'
import { SET_AUTH_CONFIG, REMOVE_AUTH_CONFIG } from '../actions'

const emptyAuthConfig = {
  username: null,
  password: null,
  subdomain: null
}

const userAuthConfig = getAuthConfig()

const initialState = userAuthConfig || emptyAuthConfig

export const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH_CONFIG:
      return action.data
    case REMOVE_AUTH_CONFIG:
      return emptyAuthConfig
    default:
      return state
  }
}
