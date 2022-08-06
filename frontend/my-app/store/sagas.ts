import { all, fork } from "redux-saga/effects";

import JokeSaga from "./jokes/saga";

export default function* rootSaga() {
  yield all([fork(JokeSaga)]);
}
