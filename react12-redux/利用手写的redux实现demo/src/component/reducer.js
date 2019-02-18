

let initstate = {
    number: 0,
    numList: []
}

const reducer = (state=initstate, action) => {
    let type = action.type;
    let newState = JSON.parse(JSON.stringify(state));
    switch (type) {
        case 'RANDOM_NUM': 
            newState.number = action.value;
            newState.numList.push(newState.number);
            return newState;
        case "DELETE_NUM":
            newState.numList.splice(action.index, 1);
            return newState;
    }
    return state;

}

export default reducer;