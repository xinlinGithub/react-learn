// import React, { Component } from "react";
// import { bindActionCreators } from './redux';
// const Context = React.createContext();
// export class Provider extends Component {
//   render() {
//     return (
//       <Context.Provider value={this.props.store}>
//         {this.props.children}
//       </Context.Provider>
//     );
//   }
// }

// export const connect = (
//   mapStateToProps,
//   mapDispatchToProps
// ) => Component => () => {//返回的是一个函数 里面返回一个组件 相当于一个返回一个模块
//   class Connect extends Component {
//     componentDidMount() {
//         const { store } = this.props;
//         // 先订阅
//         this.unsub = store.subscribe(() => {
//             this.setState(store.getState());
//         })
//     }
//     componentWillUnmount() {
//         this.unsub();
//     }
//     render() {
//       const { store } = this.props;
//         // 要把store里面的所有值都放进去
//       const state = mapStateToProps(store.getState());
//         //   dispatchMethods是一个对象 里面是一系列操作数据的集合 最后都作为属性值传到组件中
//       let dispatchMethods;
//       if(typeof mapDispatchToProps === "function") {
//         dispatchMethods = mapDispatchToProps(store.dispatch);
//       }else if(typeof mapDispatchToProps === "object") {
//         dispatchMethods = bindActionCreators(mapDispatchToProps, store.dispatch);
//       }else {
//           throw new Error("mapDispatchToProps的值必须为function或object！")
//       }
//     //   做为属性值传进去
//       return <Component {...state} {...dispatchMethods} />;
//     }
//   }
//   return (
//     //   只有在类组件中才可以订阅 函数组件中不能订阅 所以需要一步代理
//     <Context.Consumer>
//     {/* 相当于返回一个函数组件 */}
//       {store => <Connect store={store} />}
//     </Context.Consumer>
//   );
// };

import React, { Component } from "react";
import { bindActionCreators } from "./redux";
const Context = React.createContext();

export const Provider = props => {
  return (
    <Context.Provider value={props.store}>{props.children}</Context.Provider>
  );
};

export const connect = (//接受两个参数
  mapStateToProps,
  mapDispatchToProps
) => Component => () => {
  // 类组件 起代理作用 以为函数组件中没有this 没有生命周期
  class Connect extends Component {
    componentDidMount() {
        const { store } = this.props;
      this.unsub = store.subscribe(() => {
        this.setState(store.getState());
      });
    }
    componentWillUnMount() {
      this.unsub();
    }
    render() {
        const { store } = this.props;
      if (typeof mapStateToProps !== "function") {
        throw new Error("mapStateToProps必须是一个函数");
      }
      const state = mapStateToProps(store.getState());
      let mapActions = {};
      if (typeof mapDispatchToProps === "function") {
        mapActions = mapDispatchToProps(store.dispatch);
      } else if (typeof mapDispatchToProps === "object") {
        mapActions = bindActionCreators(
          mapDispatchToProps,
          this.props.store.dispatch
        );
      }
      return <Component {...state} {...mapActions} />;
    }
  }

  return (
    <Context.Consumer>
      {/* 返回一个函数组件 */}
      {store => <Connect store={store} />}
    </Context.Consumer>
  );
};
