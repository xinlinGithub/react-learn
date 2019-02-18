const actionType = {
  INIT: "@@redux/INIT"
};

const createStore = reducer => {
  let state;
  // 这里面存的是订阅的函数 dispatch完了就执行用来更新数据
  let listens = [];
  let getState = () => state;
  let isDispatching = false;
  let dispatch = action => {
    if (Object.prototype.toString.call(action) !== "[object Object]") {
      throw new Error("action 必须是个对象");
    }
    if (typeof action.type === "udefined") {
      throw new Error("action的type值必须存在");
    }
    if (isDispatching) {
      throw new Error("reducer时不可以dispatch！");
    }
    try {
      isDispatching = true;
      state = reducer(state, action);
    } finally {
      isDispatching = false;
    }
    listens.forEach(item => {
      item();
    });
  };
  // 一开始先dispatch一下 让数据发生改变 给他赋上初始值
  dispatch({ type: actionType.INIT });

  let subscribe = fn => {
    listens.push(fn);
    let index = listens.indexOf(fn);
    return () => {
      listens.splice(index, 1);
    };
  };
  return {
    getState,
    dispatch,
    subscribe
  };
};

let combineReducers = reducers => {
  let finalReducers = {};
  //先把所有函数类型的reducer收集起来
  for (let key in reducers) {
    let reducer = reducers[key];
    if (typeof reducer === "undefined") {
      throw new Error(`reducers的${key}的值必须存在`);
    }
    if (typeof reducer === "function") {
      finalReducers[key] = reducer;
    }
  }
  // 再看是否有返回值
  for (let key in finalReducers) {
    let reducer = finalReducers[key];
    let state = reducer(undefined, { type: actionType.INIT });
    if (state === "undefined") {
      throw new Error(`${key}的返回值为undefined`);
    }
  }

  return (state = {}, action) => {
    for (let key in finalReducers) {
      const reducer = finalReducers[key];
      // 一开始dispatch时state[key]肯定是undefined 就会走默认值 这样下次就有初始值了
      state[key] = reducer(state[key], action);
    }
    return state;
  };
};

let bindActionCreators = (actions, dispatch) => {
  if(typeof actions !== "object" || actions === null) {
    throw new Error("actions必须存在且为对象");
  }
  const bindCreators = {};
  for(let key in actions) {
    let creator = actions[key];
    if(typeof creator === "function") {
      bindCreators[key] = (...args) => dispatch(creator(...args));
    }
  }
  return bindCreators;
}
export { createStore, combineReducers , bindActionCreators};
