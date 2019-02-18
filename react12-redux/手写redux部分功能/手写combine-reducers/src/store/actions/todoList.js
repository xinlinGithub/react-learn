import * as Types from '../actionTypes';

export const getTodoChangeInputValAction = (value) => {
  return {
    type: Types.CHANGE_INPUT_VAL,
    value
  }
}

export const getTodoAddItemAction = (value) => {
  return {
    type: Types.ADD_TODO_ITEM,
    value
  }
}

export const getTodoDeleteItemAction = (index) => {
  return {
    type: Types.DELETE_TODO_ITEM,
    index
  }
}