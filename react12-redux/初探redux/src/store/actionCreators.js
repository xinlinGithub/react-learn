// 原来整体的actionTypes 后来被抽离出来了 这要更模块化

import * as Types from "./actionTypes"
// 将store的dispatch的action单独返回出去 模块化 更有利于管理
export const getToDoChangeInputValAction = (value) => {
    return {
        type: Types.CHANGE_INPUT_VAL,
        value
    }
}

export const getToDoAddItemAction = (value) => {
    return {
        type: Types.CHANGE_TODOLIST,
        value
    }
}

export const getToDoDeleteItemAction = (index) => {
    return {
        type: Types.DELETE_ITEM,
        index
    }
}

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