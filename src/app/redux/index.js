import { combineReducers } from "redux";
import { deleteIdReducer } from "./reducers";

export default combineReducers({
  them: deleteIdReducer,
});
