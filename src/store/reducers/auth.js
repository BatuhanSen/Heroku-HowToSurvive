import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  user: null,
  error: null,
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.token,
    user: action.user,
    error: null,
  });
};

const setUser = (state, action) => {
  return updateObject(state, {
    user: action.user,
  });
};

const authFailure = (state, action) => {
  return updateObject(state, {
    error: action.error,
  });
};

const logoutSuccess = (state, action) => {
  return updateObject(state, {
    token: null,
    user: null,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_FAIL:
      return authFailure(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logoutSuccess(state, action);
    case actionTypes.SET_USER:
      return setUser(state, action);
    default:
      return state;
  }
};

export default reducer;
