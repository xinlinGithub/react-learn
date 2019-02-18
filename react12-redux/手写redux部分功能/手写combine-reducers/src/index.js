import React from 'react';
import { render } from 'react-dom';
import TodoList from './components/TodoList';
import Counter from './components/Counter';

render(<><Counter /><TodoList /></>, window.root);