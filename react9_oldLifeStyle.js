import React from "react";
import Children from "./children";
class LifeStyle extends React.Component {
  static defaultProps = {
    // 默认属性
  };

  static propsTypes = {
    // 属相校验
  };

  constructor() {
    //   在这里面可以写一下状态
    console.log("constructor");
    super();
    this.state = {
      count: 0
    };
  }

  render() {
    //   用来渲染 不能发送Ajax请求
    // 因为拿到数据以后无法调用setUpdate会造成栈溢出 报错
    console.log("render");
    return (
      <>
        <div>
          count: {this.state.count}
          <button onClick={this.handleClick}>count++</button>
          <button onClick={this.getCount}>count</button>
          <Children count={this.state.count} />
        </div>
      </>
    );
  }
  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    });
  };
  getCount = () => {
    console.log(this.state.count);
  };
  componentWillMount() {
    //   可以写ajax请求 但官方不建议 而且官方在16.3版本中已经移除了
    console.log("componentWillMount");
  }
  componentDidMount() {
    //   在这里可以发送Ajax请求 且可以setUpdate
    console.log("componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    //   可以用来校验当状态不改变时就不让他接着往下执行
    console.log("shouldComponentUpdate");
    // nextProps要在子组件上用
    // 是否 允许组件更新
    // 此时的this.state.count的值还没有变 当执行完这一步或经过这一步之后才正式改变
    // 若返回false就不会在页面上渲染 返回true就会进一步渲染组件
    if (nextState.count === this.state.count) {
      return false;
    } else {
      return true;
    }
  }
  componentWillUpdate() {
    //   不能进行状态的设置 会造成栈溢出 基本没什么用
    console.log("componentWillUpdate");
  }

  componentDidUpdate() {
    //   不能进行状态的设置 会造成栈溢出 基本没什么用
    console.log("componentDidUpdate");
  }
}

export default LifeStyle;

import React from "react";

class Children extends React.Component{
    static defaultProps = {};
    static propsTypes = {};
    constructor() {
        console.log("constructor-2")
        
        super();
        this.state = {
            count: ""
        }
    }
    componentWillMount() {
        console.log("componentWillMount-2")
    }
    render () {
        console.log(this.props)
        console.log("render-2")
        return (
            <>
                <div>
                    <h1>{this.props.count}</h1>
                    <button onClick={this.handleClick}>count+1</button>
                    <p>{this.state.count}</p>
                </div>
            </>
        )
    }
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }
    componentDidMount() {
        // 发送ajax的最好位置 一般从这儿拿到父级的state的属性值 然后自己去改变 这样与父级就没有联系了
        // 如果父级的数值影响子集 可以不用组件 直接写到父级上
        this.setState({
            count: this.props.count
        })
        console.log("componentDidMount-2")
    }

    componentWillReceiveProps(nextProps) {
        // 可以进行状态的设置 获取nextprops 里的属性值
        // 但官方不建议这样去做 16.3版本后这个就没有了
        this.setState({
            count: nextProps.count
        })
        console.log("componentWillReceiveProps")
    }
    shouldComponentUpdate() {
        console.log("shouldComponentUpdate-1");
        return true;
    }
    componentWillUpdate() {
        // 16.3版本后移除了
        console.log("componentWillUpdate-2")
    }
    // render去渲染
    componentDidUpdate() {
        console.log("componentDidUpdate-2")
    }
    componentWillUnmount() {
        console.log("componentWillUnmount")
    }
}

export default Children;
