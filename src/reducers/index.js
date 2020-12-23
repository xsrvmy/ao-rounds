import { combineReducers } from "redux";
import scrambleReducer from "./scramblesReducer";
const reducer = combineReducers({ scrambles: scrambleReducer });
export default reducer;
