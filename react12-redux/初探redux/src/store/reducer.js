// 单个的reducer文件 所有类型的数据都整合到一块 不利于管理 
// 最后分开放到了reducers文件夹里面了 把不同功能的分成多个文件



import * as Types from "./actionTypes"
// 初始数据 吧每个功能的数据都抽离出来 比较好维护
const initState = {
    inpVal: "",
    list: [],
    count: 0
}
// 返回一个公共状态
export default (state=initState,action) => {
    // 自动接收dispatch传过来的值 然后进行操作
    const type = action.type;
    const newState = JSON.parse( JSON.stringify(state) );
    switch(type) {
        case Types.CHANGE_INPUT_VAL: 
            //用一个新的状态接收
            newState.inpVal = action.value;
            return newState;
        case Types.CHANGE_TODOLIST:
            newState.inpVal = "";
            newState.list.push(action.value);
            return newState;
        case Types.DELETE_ITEM:
            newState.list.splice(action.index, 1);
            return newState;
        case Types.ADDCOUNT:
            newState.count = newState.count + action.n;
            return newState;
        case Types.SUBCOUNT:
            newState.count = newState.count - action.m;
            return newState;
    }
    return state;
}