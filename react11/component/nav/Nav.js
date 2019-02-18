import React, { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';

import './style.css';
// 一个可以将NavLink默认的a标签变成其他标签的组件
import MenuLink from './../MenuLink';
// 封装一个路由组件 可以任意跳转已经匹配好好的路由组件
// 可以在该组件中通过this.props进行跳转
// withRouter可以为自定义组件提供router上的一些属性history match 等等 可以跳转页面

const withRouter = ( Component ) => () => <Route component={ Component }></Route>
class Nav extends Component {
  render () {
    return (
      <div className="nav">
        <span className="logo" onClick={this.handleClick}>渡一教育</span>
        <MenuLink to="/" exact>首页</MenuLink>
        <MenuLink to="/activities">动态</MenuLink>
        <MenuLink to="/topics">话题</MenuLink>
        <MenuLink to="/login">登录</MenuLink>
      </div>
    )
  }
  handleClick = () => {
    this.props.history.push("/")
  }

}

export default withRouter(Nav);