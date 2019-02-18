import * as Types from "../actionTypes"
// 初始数据 吧每个功能的数据都抽离出来 比较好维护
const initState = {
    count: 0
}
// 返回一个公共状态
export default (state=initState,action) => {
    // 自动接收dispatch传过来的值 然后进行操作
    const type = action.type;
    const newState = JSON.parse( JSON.stringify(state) );
    switch(type) {
        case Types.ADDCOUNT:
            newState.count = newState.count + action.n;
            return newState;
        case Types.SUBCOUNT:
            newState.count = newState.count - action.m;
            return newState;
    }
    return state;
}