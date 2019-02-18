import { combineReducers } from "./redux";
// import { combineReducers } from "redux";
import reducer from './reducer';
import reducer1 from "./reducer1";

export default combineReducers({
    reducer,
    reducer1
})