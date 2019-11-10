import {
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  LIKE_SCREAMS,
  UNLIKE_SCREAMS,
  DELETE_SCREAM,
  LOADING_UI,
  STOP_LOADING_UI,
  POST_SCREAM,
  SET_ERRORS,
  CLEAR_ERRORS,
  SUBMIT_COMMENT
} from "../type";
import axios from "axios";

export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  try {
    const res = await axios.get("/screams");
    dispatch({ type: SET_SCREAMS, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_SCREAMS, payload: [] });
  }
};

export const getScream = screamId => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.get(`/scream/${screamId}`);
    dispatch({ type: SET_SCREAM, payload: res.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (err) {
    console.error(err);
  }
};

export const postScream = newScream => async dispatch => {
  dispatch({ type: LOADING_UI });
  try {
    const res = await axios.post("/scream", newScream);
    dispatch({ type: POST_SCREAM, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
    return true;
  } catch (err) {
    dispatch({ type: SET_ERRORS, payload: err.response.data });
    return false;
  }
};

export const likeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}/like`);
    dispatch({ type: LIKE_SCREAMS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

export const unlikeScream = screamId => async dispatch => {
  try {
    const res = await axios.get(`/scream/${screamId}/unlike`);
    dispatch({ type: UNLIKE_SCREAMS, payload: res.data });
  } catch (err) {
    console.error(err);
  }
};

// Submit a comment
export const submitComment = (screamId, commentData) => async dispatch => {
  try {
    const res = await axios.post(`/scream/${screamId}/comment`, commentData);
    dispatch({ type: SUBMIT_COMMENT, payload: res.data });
    dispatch({ type: CLEAR_ERRORS });
    return true;
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
    return false;
  }
};

export const deleteScream = screamId => async dispatch => {
  // dispatch({type: LOADING_DATA});
  try {
    await axios.delete(`/scream/${screamId}`);
    dispatch({ type: DELETE_SCREAM, payload: screamId });
  } catch (err) {
    console.error(err);
  }
};
