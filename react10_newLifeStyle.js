import React from "react";
import AnotherChild from './anotherChild';
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
          <AnotherChild count={this.state.count} />
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

class AnotherChild extends React.Component {
    static defaultProps = {};
    static propsTypes = {};
    constructor() {
        super();
        this.state = {
            childCount: 0,
            parentCount: ""
        };
    }
    static getDerivedStateFromProps(props, state) {
        // 从属性中拿到状态 必须有返回值 首次挂载时也执行 
        // 每次props state更改之后也会执行这一个函数
        console.log("getDerivedStateFromProps-3");
        console.log(props, state);
        
        return {//将数据返回到state中 最好不要这要做 如果只是读取则无影响
            // 如果想去更改 则每次更改完就会重新又执行了这个函数 还是原来props里面的值
            // 如果想操作可以直接拿过来 自己用
            // 也就是说只能通过父级去操作它 不能通过子集操作
            m: props.count
        };
    }
    render() {
        console.log("render-3")
        return (
            <>
                <div>
                    新版本子组件
                    <h2>m:{this.state.m}</h2>
                    <h3>childCount: {this.state.childCount}</h3>
                    <h4>parentCount: {this.state.parentCount}</h4>
                    <button onClick={this.handleClick}>childCount++</button>
                </div>
            </>
        )
    }
    handleClick = () => {
        this.setState({
            childCount: this.state.childCount + 1,
            m: this.state.m + 1
        })
    }
    componentDidMount() {
        // 只初始挂载的时候执行一次
        this.setState({
            parentCount: this.props.count
        })
        console.log("componentDidMount-3");
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate-3");
        return true;
    }
    getSnapshotBeforeUpdate(prevProps, prevState) {
        // 拿到前面状态的快照 必须有返回值 必须与componentDidUpdate结合使用
        // 返回的值可以在componentDidUpdate中接收
        // 不可以setState
        console.log("getSnapshotBeforeUpdate");
        console.log(prevProps, prevState)
        return {
            a: 100
        };
    }
    componentDidUpdate(prevProps, prevState, snapShort) {
        console.log(prevProps, prevState, snapShort);
        console.log("componentDidUpdate-3")
    }
}


export default AnotherChild;
