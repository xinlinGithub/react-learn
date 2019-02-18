import React, { Component } from "react";
import { getAddCountAction } from "./../store/actions/count";
// import store from './../store/index';
// 引入connect 借助工具去更改数据
import { connect } from "react-redux";
class Count extends Component {
  render() {
    return (
      <div>
        {this.props.count}
        <button onClick={this.handleClick}>add</button>
      </div>
    );
  }
  handleClick = () => {
    this.props.add(3);
  };
}

// 一下两个函数返回的东西相当于this.props
const mapStateToProps = state => ({
  count: state.counter.count
});
const mapDispatchToProps = dispatch => ({
  add: val => {
    //任务派发
    dispatch(getAddCountAction(val));
  }
});
//  数据                派发任务
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Count);
