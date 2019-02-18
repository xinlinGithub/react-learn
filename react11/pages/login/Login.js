import React, { Component } from "react";

class Login extends Component {
  state = {
    // 通过cookie获取可以保存记录了 下次再进入时还是保留上次的结果
    isLogin: document.cookie.includes("login=true")
  };
  render() {
    return (
      <div>
        <button onClick={this.handleClick}>{this.state.isLogin ? "退出" : "登录"}</button>
      </div>
    );
  }
  handleClick = () => {
    const isLogin = this.state.isLogin;
    if(isLogin) {
      this.setCookie("login", false, -1);
    }else{
      this.setCookie("login", true, 300);
      this.jumpBack();
    }
    this.setState({
      isLogin: !isLogin
    })
  }
  setCookie = (key, value, day) => {
    const expires = day * 24 * 60 * 60 * 1000;
    const date = new Date(+new Date() + expires);
    document.cookie = `${key}=${value};expires=${date.toUTCString()};`
  }
  jumpBack = () => {
    console.log(this.props , "login")
    const { location } =  this.props;
    const from = location.state && location.state.from;
    if(from) {
      if(from === "/"){
        this.props.history.push({
          pathname: from,
          state: location.state
        })
      }else{
        this.props.history.push({
          pathname: from
        })
      }
    }
  }
}

export default Login;
