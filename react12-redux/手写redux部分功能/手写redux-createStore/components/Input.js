import React, { Component } from 'react';
import createStore from './redux';

const initState = {
    inpVal: "fsa"
}

function reducer(state=initState, action) {
    const type = action.type;
    switch (type) {
        case "CHANGE_VALUE":
            state.inpVal = action.value
    }
    return state;
}
let store = createStore(reducer);
class Input extends Component {
    state = store.getState();
    componentDidMount() {
        // 只是挂载的时候执行一次 以后更改数据时不执行 
        // 所以只添加一次 在下面某一步执行this.unsub()就会解除授权 这样就拿不到数据
        this.unsub = store.subscribe(() => {
            this.setState(store.getState());
        })
    }
  render () {
    return (
      <div>
      input:
          <input value={this.state.inpVal} onChange={this.handleChange}/>
          <p>{this.state.inpVal}</p>
      </div>
    )
  }
  handleChange = (e) => {
    const action = {
        type: "CHANGE_VALUE",
        value: e.target.value
    }
    store.dispatch(action);
    this.unsub();
  }
}

export default Input;