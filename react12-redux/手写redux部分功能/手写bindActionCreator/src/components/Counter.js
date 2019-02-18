import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
// import { getCountAddAction } from '../store/actions/counter';
import * as actions from '../store/actions/counter';
import { bindActionCreators } from "./redux";
class Counter extends Component {

  render () {
    return (
      <div>
        { this.props.count }
        <button onClick={ this.handleClick }>add</button>
      </div>
    )
  }

  handleClick = () => {
    this.props.add(6)
  }
}

// const mapStateToProps = (state) => ({
//   count: state.counter.count
// })

const mapStateToProps = (state) => state.counter;


// const mapDispatchToProps = (dispatch) => ({
//   getCountAddAction: (val) => {
//     dispatch(getCountAddAction(val))
//   }
// })

// 用自己写的bindActionCreator去简化connect使用
const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Counter);