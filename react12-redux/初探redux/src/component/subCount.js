import React, { Component } from "react";
import store from "./../store/index";
import { getSubCountAction } from "./../store/actions/count";
class SubCount extends Component {
  state = {
    count: store.getState().counter.count
  };
  componentDidMount() {
    store.subscribe(() => {
        // 直接就可以用counter 因为已经将counter拆分出来了 就直接可以用了
        // 这也是拆分出来的好处
      this.setState(store.getState().counter);
    });
  }
  render() {
    return (
      <div>
        {this.state.count}
        <button onClick={this.subCount}>sub(-)</button>
      </div>
    );
  }
  //   changeCount = () => {
  //       this.setState({
  //           count: store.getState().counter.count
  //       })
  //   }
  subCount = () => {
    const action = getSubCountAction(2);
    store.dispatch(action);
  };
}

export default SubCount;
