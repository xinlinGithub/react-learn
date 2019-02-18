import toDoList from "./toDoList";
import counter from "./count";
// 将上面的两个reduser糅杂到一起 通过combineReducers函数
import { combineReducers } from "redux";

export default combineReducers({
    toDoList,
    counter
})
