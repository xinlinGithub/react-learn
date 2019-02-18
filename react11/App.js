import React, { Component } from "react";
import Nav from "./component/nav/Nav";
import "./style/App.css";
// import { Route } from 'react-SSrouter-dom';
class App extends Component {
  render() {
    return (
      <>
        <div className="app">
          {/* <Route path="/" component={ Nav }></Route> */}
          <Nav />
          <div className="content">{this.props.children}</div>
        </div>
      </>
    );
  }
}

export default App;
