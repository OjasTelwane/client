import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED
} from '../actions/constants';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  authLoading: true,
  user: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        authLoading: false,
        user: payload
      };

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      const result = {
        ...state,
        ...payload,
        isAuthenticated: true,
        authLoading: false
      };
      return result;
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      // localStorage.removeItem('token');
      localStorage.clear();
      sessionStorage.clear();
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        authLoading: false
      };

    default:
      return state;
  }
};

export default authReducer;
