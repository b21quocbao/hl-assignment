import {
  GET_JOKES,
  GET_JOKES_SUCCESS,
  GET_JOKES_FAIL,
  CLEAR_ERROR
} from "./jokeTypes";

const initialState = {
  jokes: [],
  loading: false,
  error: {
    message: "",
  },
};

const JokeReducer = (state = initialState, joke: any) => {
  switch (joke.type) {
    case GET_JOKES:
      state = { ...state, loading: true };
      break;
    case GET_JOKES_SUCCESS:
      state = { ...state, jokes: joke.payload, loading: false };
      break;
    case GET_JOKES_FAIL:
      state = {
        ...state,
        error: {
          message: "Get jokes failed",
        },
        loading: false,
      };
      break;
    case CLEAR_ERROR:
      state = { ...state, error: { message: '' }, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default JokeReducer;