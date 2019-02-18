import * as Types from '../actionTypes';


export const getCountAddAction = (n) => {
  return {
    type: Types.COUNT_ADD,
    n
  }
}