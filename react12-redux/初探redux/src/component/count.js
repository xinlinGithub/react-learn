import React, { Component } from 'react';
import {getAddCountAction} from "./../store/actions/count"
import store from './../store/index';
class Count extends Component {
    state = {
        count: store.getState().counter.count
    }
    componentDidMount() {
        store.subscribe(() => this.setState(store.getState().counter))
    }
  render () {
    return (
      <div>
          {this.state.count}
          <button onClick={this.handleClick}>add</button>
      </div>
    )
  }
  // 下面是订阅的函数 比较简单 可以直接拿到subscribe上
//   addCount = () => {
//       this.setState({
//           count: store.getState().counter.count
//       })
//   }
  handleClick = () => {
    const action = getAddCountAction(3);
    store.dispatch(action);
  }
}

export default Count;