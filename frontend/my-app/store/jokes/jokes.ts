import {
  CLEAR_ERROR,
  GET_JOKES,
  GET_JOKES_SUCCESS,
  GET_JOKES_FAIL,
} from "./jokeTypes";

export const clearErrors = () => {
  return {
    type: CLEAR_ERROR,
  };
};

export const getJokes = () => {
  return {
    type: GET_JOKES,
  };
};

export const getJokesSuccess = (data: any) => {
  return {
    type: GET_JOKES_SUCCESS,
    payload: data,
  };
};

export const getJokesFail = (error: any) => {
  return {
    type: GET_JOKES_FAIL,
    payload: error,
  };
};
