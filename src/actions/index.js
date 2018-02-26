import { SubmissionError } from 'redux-form';
import { push } from 'react-router-redux';
import { setAuthConfig, removeAuthConfig, getProjects } from '../api';

export const SET_AUTH_CONFIG = 'SET_AUTH_CONFIG';
export const REMOVE_AUTH_CONFIG = 'REMOVE_AUTH_CONFIG';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
export const RECIEVE_PROJECTS = 'RECIEVE_PROJECTS';
export const INVALIDATE_REQUEST_PROJECTS = 'INVALIDATE_REQUEST_PROJECTS';

export const setAuthConfigAction = data => dispatch => {
  setAuthConfig(data);
  dispatch({ type: SET_AUTH_CONFIG, data });
};

export const removeAuthConfigAction = () => dispatch => {
  removeAuthConfig();
  dispatch({ type: REMOVE_AUTH_CONFIG });
};

export const requestProjects = data => dispatch => {
  dispatch({ type: REQUEST_PROJECTS });
  getProjects()
    .then(resp => {
      dispatch(receiveProjects(resp.data));
      dispatch(push('/projects'));
    })
    .catch(error => dispatch(invalidateRequestProjects('Invalid credentials')));
};

export const receiveProjects = projects => ({
  type: RECIEVE_PROJECTS,
  projects
});

export const invalidateRequestProjects = error => ({
  type: INVALIDATE_REQUEST_PROJECTS,
  error
});
