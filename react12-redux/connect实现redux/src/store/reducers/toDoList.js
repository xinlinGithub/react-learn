import * as Types from "../actionTypes";

const initState = {
    inpVal: "",
    list: []
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
    }
    return state;
}