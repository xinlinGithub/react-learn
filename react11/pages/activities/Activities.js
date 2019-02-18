import React, { Component } from "react";
import ActiviticsNav from "./../../component/activiticsNav/activiticsNav";
import { Switch, Route, Redirect, Prompt } from "react-router-dom";
// 引入各级路由
import Recommended from "./recommended/Recommended";
import All from "./all/All";
import Articles from "./articles/Articles";
import Pins from "./pins/Pins";
import "./style.css";
// prompt组件 离开页面时给个提示 message属性值必写 可以是字符串 
// 也可以是函数 return true 则跳转 return false 则不跳转 
// 想用在那个路由中 就在那个路由里面写
class Activities extends Component {
  render() {
    return (
      <>
        <Prompt message={(props) => {
          if(props.pathname.includes(this.props.match.path)){
            return true;
          }else {
            window.confirm("你确定离开吗？")
          }
        }}/>
        <ActiviticsNav>
          <Switch>
            <Route path="/activities/recommended" component={Recommended} />
            <Route path="/activities/all" component={All} />
            <Route path="/activities/articles" component={Articles} />
            <Route path="/activities/pins" component={Pins} />
            <Redirect to="/activities/recommended" />
            {/* 当进入二级路由时默认跳转一个地方  */}
          </Switch>
        </ActiviticsNav>
      </>
    );
  }
}

export default Activities;
