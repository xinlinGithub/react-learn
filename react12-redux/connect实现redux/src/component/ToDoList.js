import React, { Component } from "react";
import * as Actions from "../store/actions/toDoList";
import { connect } from "react-redux";

import { bindActionCreators }from "redux";

class ToDoList extends Component {
  render() {
    const { inpVal, list, handleAddClick, 
      getToDoChangeInputValAction,
      getToDoDeleteItemAction
    } = this.props;
    return (
      <>
        <div>
          <input value={inpVal} onChange={e => getToDoChangeInputValAction(e.target.value)} />
          <button
            onClick={() => {
              this.handleAddItem(inpVal);
            }}
          >
            添加
          </button>
        </div>
        <ul>
          {this.props.list.map((item, index) => (
            <li key={item + index.toString()}>
              {item}
              <button
                onClick={() => {
                  getToDoDeleteItemAction(index);
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
  handleAddItem = (value) => {
    if(value.trim() === ""){
      return;
    }
    this.props.getToDoAddItemAction(value);
  }
}


const mapStateToProps = state => ({
  inpVal: state.toDoList.inpVal,
  list: state.toDoList.list
});

// const mapDispatchToProps = dispatch => ({
//   handleChange: e => {
//     dispatch(Actions.getToDoChangeInputValAction(e.target.value));
//   },
//   handleAddClick: value => {
//     if (value != "") {
//       dispatch(Actions.getToDoAddItemAction(value));
//     }
//   },
//   deleteItem: index => {
//     dispatch(Actions.getToDoDeleteItemAction(index));
//     // 派遣完之后 reducer更改 更改完之后 会通过connect自动将数据传到此组件中 通过props接收
//   }
// });

// 与上面代码等同
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators( Actions, dispatch);
//   // 1.所有动作方法的集合 2.dispatch
//   // 这样就可以把action上的所有方法都拿到this.props上 就省去了上面那一步冗余
// }
// export default connect(
//   mapStateToProps,
//   // mapDispatchToProps
//   Actions//写这一个 就想当于写mapDispatchToProps函数 这样就很精简了
// )(ToDoList);
export const ToDoList =  connect(
  mapStateToProps,
  // mapDispatchToProps
  Actions//写这一个 就想当于写mapDispatchToProps函数 这样就很精简了
)(ToDoList);