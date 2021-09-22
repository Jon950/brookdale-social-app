import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import {combineReducers} from "redux"
import userReducer from "./reducers/userReducer";

// Combining all reducers
const reducers = combineReducers({
  user: userReducer,
})

// Creating the store
export const store = createStore(
  reducers,
  {},
  applyMiddleware(thunk),
)