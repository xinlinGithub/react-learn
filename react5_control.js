// 受控组件
import React from "react";
// jsx语法要用()包起来 不能用{}；
// 受控组件 组件的状态受react数据变化的影响
// 说白了就是让dom元素的一些属性值和react上的一些数据挂钩
//  dom的展现形式受所挂钩数据的影响
class Control extends React.Component {
  state = {
    list: [],
    taskA: "",
    taskB: ""
  };
  render() {
    return (
      <>
        <div>
          taskA
          <input
            name="taskA"
            value={this.state.taskA}
            onChange={this.changeValue}
            type="text"
          />
          <button name="taskA" onClick={this.handleClick}>
            添加A任务
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          taskB
          <input
            name="taskB"
            value={this.state.taskB}
            onChange={this.changeValue}
            type="text"
          />
          <button name="taskB" onClick={this.handleClick}>
            添加B任务
          </button>
        </div>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item + index}>{item}</li>
          ))}
        </ul>
      </>
    );
  }
  changeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleClick = e => {
    var name = e.target.name;
    let text;
    if (this.state[name] === "") {
      return;
    }
    if (name === "taskA") {
      text = "taskA:" + this.state.taskA;
    } else if (name === "taskB") {
      text = "taskB" + this.state.taskB;
    }
    this.setState({
      list: [...this.state.list, text],
      [name]: ""
    });
  };
}

export default Control;
