import axios from "axios";

import * as actionTypes from "./actionTypes";

export const login = (username, password) => {
  return (dispatch) => {
    axios
      .post(
        "https://how-to-survive.herokuapp.com/api/auth/login",
        {
          username: username,
          password: password,
        },
        { "Content-type": "application/json" }
      )
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.data.data.token);
          localStorage.setItem("userId", response.data.data.userId);
          dispatch(setAuth(response.data.data.user, response.data.data.token));
          window.location.href = "/";
        } else {
          dispatch(
            authFail(
              "Code : " + response.status + "\n" + response.data.data.message
            )
          );
        }
      })
      .catch((err) => {
        dispatch(authFail(err.response));
      });
  };
};

export const register = (
  username,
  password,
  email,
  firstName,
  phone,
  gender
) => {
  return (dispatch) => {
    console.log(phone);
    axios
      .put(
        "https://how-to-survive.herokuapp.com/api/auth/signup",
        {
          username: username,
          password: password,
          email: email,
          name: firstName,
          phoneNumber: phone,
          gender: gender,
        },
        { "Content-type": "application/json" }
      )
      .then((response) => {
        console.log("register response", response);
        if (response.status === 201) {
          dispatch(login(username, password));
        } else {
          dispatch(
            authFail(
              "Code : " + response.status + "\n" + response.data.data.message
            )
          );
        }
      })
      .catch((err) => {
        dispatch(authFail(err.response));
      });
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const setAuth = (user, token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    user: user,
    token: token,
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const setUser = (user) => {
  return {
    type: actionTypes.SET_USER,
    user: user,
  };
};
