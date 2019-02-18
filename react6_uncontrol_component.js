import React from "react";
// jsx语法要用()包起来 不能用{}；
// 非受控组件：组件不受Reack的state的控制 通过直接操作dom的方式去实现交互
// 有两种写法 s = React.createRef(); ref={this.s}
// 在jsx中： ref = {(dom)=> this.s = dom};
class Control extends React.Component {
  taskB = React.createRef();
  state = {
    list: []
  };
  render() {
    return (
      <>
        <div>
          taskA
          <input
            id="A"
            ref={dom => {
              this.taskA = dom;
            }}
            type="text"
          />
          <button name="taskA" onClick={this.handleClick}>
            添加A任务
          </button>
        </div>
        <div style={{ marginTop: "20px" }}>
          taskB
          <input ref={this.taskB} type="text" />
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
  handleClick = e => {
    var name = e.target.name;
    let type;
    if (name === "taskA") {
      type = this[name];
    } else if (name === "taskB") {
      type = this[name].current;
    }
    if (type.value === "") {
      return;
    }
    const text = name + ":" + type.value;
    type.value = "";
    this.setState({
      list: [...this.state.list, text]
    });
  };
}

export default Control;
