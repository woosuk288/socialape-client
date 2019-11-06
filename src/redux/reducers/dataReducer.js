import {
  LIKE_SCREAMS,
  UNLIKE_SCREAMS,
  SET_SCREAMS,
  LOADING_DATA
} from "../type";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false
      };
    case LIKE_SCREAMS:
    case UNLIKE_SCREAMS:
      let index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return {
        ...state
      };
    default:
      return state;
  }
}
