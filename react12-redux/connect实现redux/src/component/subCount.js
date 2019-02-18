import React, { Component } from "react";
import store from "./../store/index";
import * as count from "./../store/actions/count";
import { connect } from 'react-redux';
class SubCount extends Component {
  render() {
    return (
      <div>
        {this.props.count}
        <button onClick={this.subCount}>sub(-)</button>
      </div>
    );
  }
  subCount = () => {
    this.props.getSubCountAction(3);
  };
}

const mapStateToProps = state => (state.counter);
export default connect(mapStateToProps, count)(SubCount);
