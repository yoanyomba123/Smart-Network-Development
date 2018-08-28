import {
  GET_ERRORS,
  GET_PROFILE,
  PROFILE_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_PROFILES
} from "./types";
import axios from "axios";

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/")
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    );
};

// get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// loading profile
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// clear profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};

// create user profile and redirect if no errors found
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile/", profileData)
    .then(result => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// add experience

export const addExperience = (expData, history) => dispatch => {
  axios
    .post("/api/profile/experience", expData)
    .then(response => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const addEducation = (expData, history) => dispatch => {
  axios
    .post("/api/profile/education", expData)
    .then(response => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const addHonors = (honorData, history) => dispatch => {
  axios
    .post("/api/profile/honors", honorData)
    .then(response => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const addProjects = (projectData, history) => dispatch => {
  axios
    .post("/api/profile/projects", projectData)
    .then(response => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

export const addVolunteer = (volunteerData, history) => dispatch => {
  axios
    .post("/api/profile/volunteer", volunteerData)
    .then(response => history.push("/dashboard"))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// delete experience
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(response =>
      dispatch({
        type: GET_PROFILES,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};

// delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// delete volunteer experinece
export const deleteVolunteer = id => dispatch => {
  axios
    .delete(`/api/profile/volunteer/${id}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// delete volunteer Project
export const deleteProject = id => dispatch => {
  axios
    .delete(`/api/profile/project/${id}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// delete Honor Project
export const deleteHonors = id => dispatch => {
  axios
    .delete(`/api/profile/honors/${id}`)
    .then(response =>
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// delete account and profile
export const deleteAccount = () => dispatch => {
  if (
    window.confirm(
      "Do you really want to delete Your account? This Cannot be Undone"
    )
  ) {
    axios
      .delete("/api/profile/profile")
      .then(response =>
        dispatch({
          type: SET_CURRENT_USER,
          payload: {}
        })
      )
      .catch(error =>
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data
        })
      );
  }
};
