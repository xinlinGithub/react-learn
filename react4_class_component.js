import React from "react";
import { render } from "react-dom";

// 类组件必须有自己的render方法 必须有返回值 绑定事件时要绑定this
// 当绑定的事件函数是用箭头函数写的就不需要手动绑定this了
// 因为箭头函数会自动向上寻找this 这样就比较便利了
// 绑定事件时 要首字母大写eg: onClick={};
// 连续操作this.setState时会批量更新 即会将多个代码块合并到一块执行
// 这样有可能会拿不到上次执行后的值 可以通过传入函数的形式去改变这种现象
// 使用参数prevState 去拿到上次执行后的 结果进行运用
class ToDoList extends React.Component {
  constructor() {
    //用不着的话可以不用写
    super();
  }
  state = {
    list: [],
    inpVal: "",
    count: 0
  };
  render() {
    return (
      <>
        <div>
          <input
            type="text"
            value={this.state.inpVal}
            onChange={this.changeVal}
            onKeyDown={this.handleDown}
          />
          <button onClick={this.handleClick}>添加</button>
        </div>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item}>
              {item}
              <button
                onClick={() => {
                  this.deleteItem(index); //不能直接写这段代码 在外面加一个匿名函数 否则传参后他就立即执行了
                }}
              >
                XX
              </button>
            </li>
          ))}
        </ul>
        <div>
          {this.state.count}
          <button onClick={this.addCount}>++++</button>
        </div>
      </>
    );
  }
  deleteItem = index => {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({
      list
    });
  };
  changeVal = e => {
    this.setState({
      inpVal: e.target.value
    });
  };
  handleClick = () => {
    if (this.state.inpVal !== "") {
      this.setState({
        list: [...this.state.list, this.state.inpVal],
        inpVal: ""
      });
    }
  };
  handleDown = e => {
    //默认就有这个e参数事件原对象 即使不传参也有
    if (e.which === 13 && this.state.inpVal !== "") {
      this.handleClick();
    }
  };
  addCount = () => {
    //   这样无法实现预期的效果
    //   this.setState({
    //       count: this.state.count + 1
    //   })
    //   this.setState({
    //       count: this.state.count + 2
    //   })
    //   this.setState({
    //       count: this.state.count + 3
    //   })
    // 改进 里面可以传一个函数 返回所要的对象 拿到前面的值 prevState
    this.setState(prevState => {
      console.log(prevState.count);
      return {
        count: prevState.count + 1
      };
    });
    this.setState(prevState => {
      console.log(prevState.count);
      return {
        count: prevState.count + 2
      };
    });
    this.setState(prevState => {
      console.log(prevState.count);
      return {
        count: prevState.count + 2
      };
    });
  };
}

export default ToDoList;
