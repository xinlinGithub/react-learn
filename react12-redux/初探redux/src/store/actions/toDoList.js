import * as Types from "../actionTypes";


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