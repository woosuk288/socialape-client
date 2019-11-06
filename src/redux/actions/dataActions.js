import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAMS,
  UNLIKE_SCREAMS
} from "../type";
import axios from "axios";

export const getScreams = () => async dispatch => {
  dispatch({ type: LOADING_DATA });
  const res = await axios.get("/screams");

  try {
    dispatch({ type: SET_SCREAMS, payload: res.data });
  } catch (err) {
    dispatch({ type: SET_SCREAMS, payload: [] });
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
