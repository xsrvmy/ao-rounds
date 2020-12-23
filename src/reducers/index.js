import { combineReducers } from "redux";
import scrambleReducer from "./scramblesReducer";
import sessionReducer from "./sessionReducer";
const reducer = combineReducers({
  scrambles: scrambleReducer,
  session: sessionReducer,
});
export default reducer;
