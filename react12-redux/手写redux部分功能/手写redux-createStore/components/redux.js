
// 有三个参数 
// 1.reducer 
// 2.一个对象{} 可以作为state的初始的状态
// 3.为一个函数 
const actionType = {
    INIT: "@@redux/INIT"
}
const createStore =  (reducer, preloadedState, enhancer) => {
    // preloadedState 一般是个对象 预加载的初始状态 enhancer是一个工具函数
    if(typeof preloadedState === "function" && typeof enhancer === 'undefined') {
        enhancer = preloadedState;
        preloadedState = undefined;
    }
    if(typeof enhancer === 'function') {
        return enhancer(createStore)(reducer, preloadedState);
    }
    if(typeof reducer != 'function') {
        throw new Error("传入reducer错误");
    }
    let state = preloadedState;
    let listeners = [];
    // dispatch的时候就是让reducer这个管理员去执行函数 此时如果不执行完不能再执行相应的dispatch
    // 所以需要加一个锁
    let isDispatching = false;

    const getState = () => state;


    const dispatch = (action) => {
        if(typeof action != "object") {
            throw new Error("传入的action不是一个简单对象！")
        }
        if(typeof action.type === 'undefined') {
            throw new Error("action.type的值为undefined")
        }
        // 如果reducer里面再执行dispatch就报错
        if(isDispatching) {
            throw new Error("reduser里面不能dispatch！")
        }

        try{
            isDispatching = true;
            state = reducer(state, action)
        }finally{
            isDispatching = false;
        }
        
        listeners.forEach(item => item())
    }
    dispatch({type: actionType.INIT});
    console.log(state)
    const subscribe = (fn) => {
        listeners.push(fn)

        return () => {
            const index = listeners.indexOf(fn);
            listeners.splice(index, 1);
        }
    }
    return {
        getState,
        dispatch,
        subscribe
    }
}

export default createStore;