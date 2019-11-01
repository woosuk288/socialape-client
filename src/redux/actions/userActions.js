import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI } from "../type";
import axios from "axios";

export const loginUser = (userData, history) => async dispatch => {
  dispatch({
    type: LOADING_UI
  });
  console.log(userData);
  console.log(history);
  try {
    const res = await axios.post("/login", userData);
    const FBIdToken = `Bearer ${res.data.token}`;
    localStorage.setItem("FBIdToken", FBIdToken);
    axios.defaults.headers.common["Authorization"] = FBIdToken;
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (err) {
    dispatch({
      type: SET_ERRORS,
      payload: err.response.data
    });
  }
};

export const getUserData = () => async dispatch => {
  try {
    const res = await axios.get("/user");
    dispatch({
      type: SET_USER,
      payload: res.data
    });
  } catch (err) {
    console.error(err);
  }
};
