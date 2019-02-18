
// 父父级
import React from "react";
import { Provider } from "./context";
import List from "./list";
// 组件间的交互 
// 法一：一级一级的传值 从父级到子集 再从子集到父级 这样比较麻烦
// 法二：利用React的一个api React.createContext() => {
    // Provider,传值
    // Consumer接受值 必须以函数接受参数的形式去接受
// }
// 可以单独建立一个文件给引入
class ToDoList1 extends React.Component {
  state = {
    list: []
  };
  type = React.createRef();
  render() {
    return (
      <Provider value={{ deleteTask: this.deleteList, myList: this.state.list }}>
        <div>
          <input type="text" ref={this.type} />
          <button onClick={this.handleClick}>提交</button>
        </div>
        <List list={this.state.list} fn={this.deleteList} />
      </Provider>
    );
  }
  handleClick = () => {
    let val = this.type.current.value;
    if (val === "") {
      return;
    }
    this.setState({
      list: [...this.state.list, val]
    });
    this.type.current.value = "";
  };

  
  deleteList = index => {
    var list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list
    });
  };
}
export default ToDoList1;

// 父级
import React from "react";
import ListChildren from "./listChildren";
import { Consumer } from "./context";

class List extends React.Component {
  render() {
    let { list, fn } = this.props;
    return (
      <Consumer>
        {({ myList }) => {
          return (
            <ul>
              {myList.map((item, index) => (
                <ListChildren item={item} index={index} deleteList={fn} />
              ))}
            </ul>
          );
        }}
      </Consumer>
    );
  }
}

export default List;

// 子集
import React from "react";
import { Consumer } from "./context";
class ListChildren extends React.Component {
  render() {
    let { item, index, deleteList } = this.props;
    return (
      <Consumer>
        {({ deleteTask }) => (
          <li key={item + index}>
            {item}
            <button
              onClick={() => {
                deleteTask(index);
              }}
            >
              XXXXX
            </button>
          </li>
        )}
      </Consumer>
    );
  }
}

export default ListChildren;
