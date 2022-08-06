import { combineReducers } from "redux";

import JokeReducer from "./jokes/reducer";

const rootReducer = combineReducers({
  JokeReducer,
});

export default rootReducer;