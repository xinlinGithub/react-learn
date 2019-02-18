import counter from "../store/reducers/counter";
import todoList from "../store/reducers/todoList";


// 有三个参数 
// 1.reducer 
// 2.一个对象{} 可以作为state的初始的状态
// 3.为一个函数 
const actionType = {
    INIT: "@@redux/INIT"
}
const createStore =  (reducer, preloadedState, enhancer) => {
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
    // 一开始让他执行一下是为了让state拿到值
    dispatch({type: actionType.INIT});
    

    // 一开始就要先授权动作函数 dispatch之后就让他授权的函数执行 已达到更新数据的目的
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



const combineReducers = (reducers) => {
    const finalReducer = {};
    for(let key in reducers) {
        const reducer = reducers[key];
        // reducer必须存在且是一个函数
        if(typeof reducer === 'undefined') {
            console.error(`reducer${key}的值是undefined`)
        }
        // 将原始的函数过滤成自己要求的函数
        if(typeof reducer === "function"){
            finalReducer[key] = reducer;
        }
    }
    for(let key in finalReducer) {
        const reducer = finalReducer[key];
        const state = reducer(undefined, {type: actionType.INIT})
        if(state === "undefined") {
            throw new Error(`reducer的${key}的返回值为undefined`);
        }
    }

    // 返回一个将数据合并之后的reducers函数 可以的到各个组件对应的数据
    // 然后在createStore中作为参数传入
    return (state={}, action) => {
        for(let key in finalReducer) {
            const reducer = finalReducer[key];
            const newState = reducer(state[key], action);
            state[key] = newState;
        }
        return state;
    }
}
export {
    createStore,
    combineReducers
}