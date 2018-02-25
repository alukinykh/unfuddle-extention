import {
  REQUEST_PROJECTS,
  RECIEVE_PROJECTS,
  INVALIDATE_REQUEST_PROJECTS
} from '../actions';

const initialState = {
  isFetching: false,
  projects: [],
  error: []
};

export const projects = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_PROJECTS:
      return { ...state, isFetching: true };
    case RECIEVE_PROJECTS:
      return {
        ...state,
        isFetching: false,
        projects: action.projects,
        error: []
      };
    case INVALIDATE_REQUEST_PROJECTS:
      return { ...state, error: action.error };
    default:
      return state;
  }
};
