import axios from 'axios';
import { SessionStorageKeywords } from '../../shared/constants/global-constant';
import { setAuthToken } from '../services/central-operations.service';
import { Notification } from '../services/notification.service';
import { setAlert } from './alert';
import {
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED
} from './constants';
//load user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('authenticate');
    sessionStorage.setItem(
      SessionStorageKeywords.currentUser,
      JSON.stringify(res.data)
    );
    console.log('user-with-permissions===>', res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};
//Register user
export const register =
  ({ name, empId, email, password }) =>
  async (dispatch) => {
    const newUser = {
      name,
      empId,
      email,
      password
    };
    const body = JSON.stringify(newUser);
    try {
      const res = await axios.post('register', body);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.array.forEach((element) => {
          dispatch(setAlert(error.msg, 'danger'));
        });
      }
      dispatch({
        type: REGISTER_FAIL
      }); 
    }
  };
//Login user
export const login =
  ({ empId, password }) =>
  async (dispatch) => {
    const newLogin = {
      empId,
      password
    };
    const body = JSON.stringify(newLogin);
    try {
      const res = await axios.post('login', body);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      });
      dispatch(loadUser());
      Notification('success', 'Logged in successfully');
      console.log('inside Auth Login printing data==>', res);
    } catch (error) {
      const errors = error?.message
        ? error?.message
        : error?.response?.data?.errors;
      if (typeof errors === 'object') {
        errors.forEach((element) => {
          dispatch(setAlert(element.msg, 'danger'));
        });
      } else {
        Notification('error', 'Invalid Credentials');
      }
      dispatch({
        type: LOGIN_FAIL
      });
    }
  };
//Logout / Clear user
export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT
  });
  Notification('success', 'Logged out successfully');
};
