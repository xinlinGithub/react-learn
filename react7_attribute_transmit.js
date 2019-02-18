import React from "react";
import PropTypes from "prop-types";
// 属性传递props中就含有所有传递的东西 是一个对象 就是写在组件上的各个属性值得集合
// 属性值的校验 各种校验形式 有的不太常用 可以当时候去官网查
// 不能直接改变props中的值 可以放到state中去用
class Person extends React.Component {
  state = {
    age: this.props.age
  };
  static defaultProps = {
    //里面是一些默传的值认值
    figure: PropTypes.objectOf(PropTypes.number),
    name: "xiulin"
  };
  static propTypes = {
    name: PropTypes.string,
    age: PropTypes.number,
    sex: PropTypes.oneOf(["男", "女"]),
    hobby: PropTypes.arrayOf(PropTypes.string),
    salary: (props, propsname, component) => {
      if (props[propsname] < 1000) {
        throw new Error(`${component}中的salary太小了！`);
      }
    }
  };
  render() {
    const { name, age, sex, figure, hobby, salary } = this.props;

    return (
      <>
        <ul>
          <li>name:{name}</li>
          <li>age:{age}</li>
          <li>sex:{sex}</li>
          <li>weight:{figure.weight}kg</li>
          <li>height:{figure.height}cm</li>
          <li>hobby:{hobby}</li>
          <li>salary:{salary}/year</li>
        </ul>
        <button onClick={this.changeName}>age: {this.state.age}</button>
      </>
    );
  }
  changeName = () => {
    let age = this.state.age;
    age++;
    this.setState({
      age
    });
  };
}

export default Person;
// 入口文件
const person = {
    // name: '杉杉',
    age: 18,
    sex: '女',
    figure: {
      weight: 95,
      height: 165
    },
    hobby: ['读书', '看报'],
    salary: 10000000
  }

render(<Preson { ...person }></Preson>, document.getElementById("root")); 
