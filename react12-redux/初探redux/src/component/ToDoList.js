import React, { Component } from "react";
import * as Types from "../store/actionTypes"
import * as Actions from "../store/actionCreators"
// 引入store时会自动引入index.js 然后去使用它 获得或更改里面的数据
// store.getState()去或的数据 返回一个对象
import store from "./../store/index";
import Count from './count';
import SubCount from './subCount';
class ToDoList extends Component {
  // 通过这样的方法就不能直接更改state里面的值了
  // 得通过store 去更改 因为更改了有时也不起作用 还会再被store更改
  state = store.getState().toDoList;
  componentDidMount() {
    //   数据一旦在store中更改完成 会立即通过subscribe就可以订阅到更改后的数据 拿到组件中使用
    // 里面传一个函数 去进行相应的更改操作
    // 只是初始时把要订阅的方法放进去 然后以后就会按这个方法去拿到数据 每次dispatch操作完 就会进行相应的操作
    store.subscribe(() => this.setState(store.getState().toDoList));
  }
  render() {
    return (
      <>
        <Count />
        <div>
        ---------------------------------------------
        </div>
        <SubCount />
        <div>
          <input value={this.state.inpVal} onChange={this.handleChange} />
          <button onClick={this.handleClick}>添加</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item + index.toString()}>
              {item}
              <button
                onClick={() => {
                  this.deleteItem(index);
                }}
              >
                XXX
              </button>
            </li>
          ))}
        </ul>
      </>
    );
  }
  //   显示input内容
  handleChange = e => {
    // 更改数据 需要派遣一个action去更改 相当于一个使者
    const action = Actions.getToDoChangeInputValAction(e.target.value);
    // const action = {
    //   type: Types.CHANGE_INPUT_VAL,
    //   value: e.target.value
    // };
    store.dispatch(action);
    //传给reducer(管理员) 管理员接收到后负责管理数据
  };
//   handleStoreChange = () => {
//     this.setState(store.getState().toDoList);
//   };
  //   显示列表
  handleClick = () => {
    if (this.state.inpVal === "") {
      return;
    }
    const action = Actions.getToDoAddItemAction(this.state.inpVal);
    // const action = {
    //   type: Types.CHANGE_TODOLIST,
    //   value: this.state.inpVal
    // };
    store.dispatch(action);
  };
  deleteItem = index => {
      const action = Actions.getToDoDeleteItemAction(index);
    // const action = {
    //   type: Types.DELETE_ITEM,
    //   index
    // };
    store.dispatch(action);
  };
}

export default ToDoList;
