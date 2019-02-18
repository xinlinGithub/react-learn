import React, { Component } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";

class ActiviticsNav extends Component {
  render() {
    return (
      <div className="activities-nav">
      {/* 二级路由 */}
        <NavLink to="/activities/recommended">推荐</NavLink>
        <NavLink to="/activities/all">综合</NavLink>
        <NavLink to="/activities/articles">文章</NavLink>
        <NavLink to="/activities/pins">沸点</NavLink>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}

export default ActiviticsNav;
