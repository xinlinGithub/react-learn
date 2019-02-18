// 生成store 用于储存共有数据 相当于一个容器 一个商店 一个网盘
// store得先创建 调用一个函数
import { createStore } from "redux";
// reducer是一个方法 用来管理state 最后返回一个state
// 引入糅杂到一块的reducers
import reducer from "./reducers/index";

// 创建商店 传入一个管理员
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
