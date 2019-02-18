import React from "react";
import { render } from "react-dom";
import ToDoList from "./component/ToDoList";
// Provider是一个中间件 他是为了更好的拿到数据的状态（state)而存在的
import { Provider } from "react-redux";
import store from './store/index';
import Count from './component/count';
import SubCount from './component/subCount';

// 借助一个Provider库更好的实现react-redux
render(
  <Provider store={store}>
  {/* 里面的全是消费者 可以通过connect链接到store去更改数据 */}
    <Count />
    <ToDoList />
    <SubCount />
  </Provider>,
  window.root
);
