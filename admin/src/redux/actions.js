/* eslint-disable no-unused-vars */
// import { Router as router } from "@mui/icons-material";
import { notification } from 'antd';
import request from '../api/request'
import { STUDENTS_LIST } from './types';

const openNotificationWithIcon = (type, message) => {
  notification[type]({
    message: message,
  });
};

export const loginAction =  (data) => async (dispatch) => {
  const { email, password } = data;
  const res = await request('/login', {
    method: 'post',
    data: {
      email: data.email,
      username: data.username,
      password: data.password
    },
  });
  console.warn("users **************",res )
  if (email && password) {
    sessionStorage.setItem('isLoggedin', true);
    openNotificationWithIcon('success', "Logged in, Welcome Back!")
    return dispatch({
      type: "LOGIN_USER",
      payload: data,
    });
  } else {
    openNotificationWithIcon('error', "Try with given credentials")
  }
};
export const registerAction = (data) => (dispatch) => {
  console.log("data in actions", data);
  const res = request('/register', {
    method: 'post',
    data: {
      email: data.email,
      username: data.username,
      password: data.password
    },
  });
};

export const fetchStudents = (data) => (dispatch) => {
  console.log("data in actions", data);
  request('/admission', {
    method: 'get',
  }).then(resp => {
    dispatch({
      type: STUDENTS_LIST,
      payload: resp
    })
  });
};

