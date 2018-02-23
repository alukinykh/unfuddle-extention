import { setAuthConfig, removeAuthConfig } from "../api/index"

export const SET_AUTH_CONFIG = 'SET_AUTH_CONFIG'

export const REMOVE_AUTH_CONFIG = 'REMOVE_AUTH_CONFIG'

export const setAuthConfigAction = data => dispatch => {
  setAuthConfig(data)
  dispatch({type: SET_AUTH_CONFIG, data})
}

export const removeAuthConfigAction = () => dispatch => {
  removeAuthConfig()
  dispatch({type: REMOVE_AUTH_CONFIG})
}