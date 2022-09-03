import {combineReducers} from "redux";
import sidebarReducer from "./sidebar";
import themeReducer from "./theme";
import  notesReducer  from "./notes";

const reducers =combineReducers({
    sidebar:sidebarReducer,
    theme:themeReducer,
    notes: notesReducer
})
export default reducers;