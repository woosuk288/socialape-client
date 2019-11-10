import {
  LIKE_SCREAMS,
  UNLIKE_SCREAMS,
  SET_SCREAMS,
  SET_SCREAM,
  LOADING_DATA,
  DELETE_SCREAM,
  POST_SCREAM,
  SUBMIT_COMMENT
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
    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload
      };
    case LIKE_SCREAMS:
    case UNLIKE_SCREAMS:
      index = state.screams.findIndex(
        scream => scream.screamId === action.payload.screamId
      );
      state.screams[index] = action.payload;
      if (state.scream.screamId === action.payload.screamId) {
        state.scream = action.payload;
      }
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
    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams]
      };
    case SUBMIT_COMMENT:
      const idx = state.screams.findIndex(
        scream => scream.id === action.payload.screamId
      );
      return {
        ...state,
        scream: {
          ...state.scream,
          comments: [action.payload, ...state.scream.comments]
        }
      };
    default:
      return state;
  }
}
