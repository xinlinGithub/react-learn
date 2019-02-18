import * as Types from '../actionTypes';

const initState = {
  count: 0
}


export default (state=initState, action) => {
  const newState = JSON.parse( JSON.stringify(state));

  switch (action.type) {
    case Types.COUNT_ADD:
      newState.count = newState.count + action.n;
      return newState;
  }

  return state;
}