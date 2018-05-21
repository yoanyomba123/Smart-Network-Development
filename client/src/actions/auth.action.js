import { GET_ERRORS } from "./types";
import { SET_CURRENT_USER } from "./types";
import { LOAD_FEED } from "./types";

import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utilities/setAuthToken";
// register some user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(result => history.push("/login"))
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        errors: error.response.data
      });
    });
};

// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(result => {
      //Save token to local storage
      const { token } = result.data;

      // set toaken to local storage
      localStorage.setItem("jwtToken", token);

      // set token to auth header
      setAuthToken(token);

      // decode token to get user data
      const decoded = jwt_decode(token);

      // set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        errors: error.response.data
      });
    });
};

// log out user
export const logoutUser = () => dispatch => {
  // remove token from local storage
  localStorage.removeItem("jwtToken");
  // remove auth header for future requests
  setAuthToken(false);
  // set the current user to an ampty object wihch will set isauthenticated to false
  dispatch(setCurrentUser({}));
};

// load feed
export const loadFeed = () => dispatch => {
  axios
    .get("/api/rss/markets")
    .then(response => {
      dispatch({
        type: LOAD_FEED,
        payload: response.data
      });
    })
    .catch(error => {
      dispatch({
        type: GET_ERRORS,
        errors: error.response.data
      });
    });
};
