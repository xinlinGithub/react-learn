import React, { Component, Fragment } from "react";
import action from "./actions/action";
import action1 from "./actions/action1";

import { connect } from "./component/react-redux";
import { bindActionCreators } from "./component/redux";
const actions = { ...action, ...action1 };

class App extends Component {
  // state = store.getState();
  // componentDidMount() {
  //   this.unsub = store.subscribe(() => this.setState(store.getState()));
  // }
  render() {
    const { numList, deleteNumArr } = this.props;
    return (
      <div>
        <button onClick={this.randomNum}>随机数</button>
        <p>
          生成数：
          {numList.map((item, index) => {
            return (
              <Fragment key={item + "" + index}>
                <span
                  key={item + "" + index}
                  onClick={index => this.deleteList(item)}
                >
                  {item}
                  {index % 5 === 4 ? "" : "|"}
                </span>
                {index % 5 === 4 ? <br key={index / 5} /> : ""}
              </Fragment>
            );
          })}
        </p>
        {deleteNumArr.length > 0 ? <hr /> : ""}
        <p>
          {deleteNumArr.length > 0 ? "删除数：" : ""}
          {deleteNumArr.map((item, index) => {
            return (
              <Fragment key={item + "" + index}>
                <span key={item + "" + index}>
                  {item}
                  {index % 5 === 4 ? "" : "|"}
                </span>
                {index % 5 === 4 ? <br key={index / 5} /> : ""}
              </Fragment>
            );
          })}
        </p>
      </div>
    );
  }
  randomNum = () => {
    // store.dispatch(actions.randomNum());
    this.props.randomNum();
  };
  deleteNum = index => {
    // store.dispatch(actions.deleteNum(index));
    this.props.deleteNum(index);
  };
  deleteList = item => {
    // store.dispatch(actions.deleteNum1(item));
    this.props.deleteNum1(item);
    this.props.deleteNum(this.props.numList.indexOf(item));
  };
}

const mapStateToProps = state => ({
  numList: state.reducer.numList,
  deleteNumArr: state.reducer1.deleteNum
});

// const mapDispatchToProps = (dispatch) => ({
//   deleteNum: (index) => {
//     dispatch(actions.deleteNum(index))
//   },
//   randomNum: () => {
//     dispatch(actions.randomNum());
//   },
//   deleteNum1: (item) => {
//     dispatch(actions.deleteNum1(item))
//   }
// })
// export default App;

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);
export default connect(
  mapStateToProps,
  actions
)(App);
