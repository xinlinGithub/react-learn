import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "./component/react-redux";
import { createStore } from "./component/redux";
import reducer from "./component/reducers";
const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
