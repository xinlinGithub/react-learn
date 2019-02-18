import React from 'react';
import { render } from 'react-dom';
// 比较容易传递和更改state 简便的实现redux功能
import { Provider } from 'react-redux';
import {Provider as MyProvider} from "./react-redux";
import store from './store';

import TodoList from './components/TodoList';
import Counter from './components/Counter';

// react-redux <Provider> connect
// npm install react-redux --save


// 看看具体如何操作provider组件和使用connect方法
render(
  <MyProvider store={store}>
  {/* 在子组件中去使用store */}
    <Counter />
    <TodoList />
  </MyProvider>, 
  window.root
);