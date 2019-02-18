import React, { Component } from "react";
import { bindActionCreators } from 'redux';
const Context = React.createContext();
export class Provider extends Component {
  render() {
    return (
      <Context.Provider value={this.props.store}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const connect = (
  mapStateToProps,
  mapDispatchToProps
) => Component => () => {
  class Connect extends Component {
    componentDidMount() {
        const { store } = this.props;
        this.unsub = store.subscribe(() => {
            this.setState(store.getState());
        })
    }
    componentWillUnmount() {
        this.unsub();
    }
    render() {
      const { store } = this.props;
      const state = mapStateToProps(store.getState());
      let dispatchMethods;
      if(typeof mapDispatchToProps === "function") {
        dispatchMethods = mapDispatchToProps(store.dispatch);
      }else if(typeof mapDispatchToProps === "object") {
        dispatchMethods = bindActionCreators(mapDispatchToProps, store.dispatch);
      }else {
          throw new Error("mapDispatchToProps的值必须为function或object！")
      }
      return <Component {...state} {...dispatchMethods} />;
    }
  }
  return (
    //   只有在类组件中才可以订阅 函数组件中不能订阅 所以需要一步代理
    <Context.Consumer>
      {store => <Connect store={store} />}
    </Context.Consumer>
  );
};
