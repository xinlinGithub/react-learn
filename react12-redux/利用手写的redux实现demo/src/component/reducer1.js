
const initState = {
    deleteNum: []
}

const reducer1 = (state=initState, action) => {
    const type = action.type;
    let newState = JSON.parse(JSON.stringify(state))
    switch (type) {
        case "DELETE_NUM1":
            newState.deleteNum.push(action.value);
            return newState;
    }
    return state;
}
export default reducer1;