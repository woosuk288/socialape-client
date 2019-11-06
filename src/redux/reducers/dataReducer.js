import {
  LIKE_SCREAMS,
  UNLIKE_SCREAMS,
  SET_SCREAMS,
  LOADING_DATA,
  DELETE_SCREAM
} from "../type";

const initialState = {
  screams: [],
  scream: {},
  loading: false
};

export default function(state = initialState, action) {
  let index = -1;
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
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      return {
        ...state
      };
    case DELETE_SCREAM:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload
      );
      state.screams.splice(index, 1);
      return {
        ...state
      };
    default:
      return state;
  }
}
