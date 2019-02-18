import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';

import TodoList from './components/TodoList';
import Counter from './components/Counter';

// react-redux <Provider> connect
// npm install react-redux --save

render(
  <Provider store={store}>
    <Counter />
    <TodoList />
  </Provider>, 
  window.root
);