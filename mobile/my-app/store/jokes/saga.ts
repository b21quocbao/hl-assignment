import { takeLatest, put, call } from "redux-saga/effects";
import { GET_JOKES } from "./jokeTypes";
import { getJokesSuccess, getJokesFail, getJokes } from "./jokes";

function* onGetJokes() {
  try {
    const response = yield call(() => fetch("http://10.0.2.2:13009/api/jokes"));
    const data = yield call(() => response.json());

    yield put(getJokesSuccess(data));
  } catch (error) {
    console.log(JSON.stringify(error), "Line #55 saga.ts");

    yield put(getJokesFail(error));
  }
}

function* JokeSaga() {
  yield takeLatest(GET_JOKES, onGetJokes);
}

export default JokeSaga;
