// import { combineReducers } from 'redux';
import { combineReducers } from "../../components/redux"
import todoList from './todoList';
import counter from './counter';

export default combineReducers({
  todoList,
  counter
})

