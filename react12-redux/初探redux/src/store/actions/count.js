import * as Types from "../actionTypes"
// 将store的dispatch的action单独返回出去 模块化 更有利于管理

export const getAddCountAction = (n) => {
    return {
        type: Types.ADDCOUNT,
        n
    }
}

export const getSubCountAction = (m) => {
    return {
        type: Types.SUBCOUNT,
        m
    }
}