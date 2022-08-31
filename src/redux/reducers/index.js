import {combineReducers} from "redux";
import sidebarReducer from "./sidebar";

const reducers =combineReducers({
    sidebar:sidebarReducer
})
export default reducers;