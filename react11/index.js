import React from "react"; //{这里面的是react的属性 react必须有这个属性才有效}
// 引入React只有上面唯一形式 在{}外面引入的是模块
import { render } from "react-dom";
import "./style/index.css";
// 路由配置
import Home from "./pages/home/Home";
import Activities from "./pages/activities/Activities";
import Topics from "./pages/topics/Topics";
import Login from "./pages/login/Login";
import Article from "./pages/article/Article";
// 路由权限校验 根据一定的条件选择匹配的路由
import PrivateRoute from "./component/PrivateRoute";


// 错误页面的组件
import NoMatch from "./pages/noMatch/NoMatch";

import App from "./App";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
// 一个是HashRouter 另一个是BrowserRouter
// 前者在浏览器上显示的链接多个#/ 而后者没有且更符合常理 通常用后者
// 将他重命名是方便以后的修改

// Route是负责每个路径的
// 里面有path属性：加载页面级组件(就是访问时输入的连接)
// component 每个路径上的组件名称
// exact 严格匹配 只有输入的连接与path完全一致时才加载 防止"/" 影响别的路径

// 公共组件 导航栏之类的 共有组件
// Switch: 只显示一个组件 显示当前路径的组件 防止有包含关系
// Link: 渲染成a标签 但不能区分点击的为哪一个 有一个to属性跳转route里面的路径
// NavLink: 渲染成a标签 可以区分为点击的哪一个 使classname="active"; 有一个to属性跳转route里面的路径
// Redirect: 重定向 当加载没有的页面时 就默认跳转一个页面 有一个to属性跳转route里面的路径
render(
  <Router>
    <>
      <App>
        <Switch>
          {/* 下面四个只显示一个 且都是页面级组件*/}
          <Route path="/" exact component={Home} />
          <Route path="/activities" component={Activities} />
          {/* <Route path="/topics" component={Topics} /> */}
          <PrivateRoute path="/topics" redPath="/login" component={Topics} />
          <Route path="/login" component={Login} />
          {/* 动态路由 可以在后面以:id的方式拼接东西 可以在组件中this.props.params拿到这个值*/}
          <Route path="/article:id" component={Article} />
          {/* 配置错误页面路由 */}
          <Route path="/error.html" component={NoMatch}/>
          <Redirect to="/error.html" />
          {/* to之后就会往route里面去找路径 然后跳转 这样就不用写component了 */}
        </Switch>
      </App>
    </>
  </Router>,
  document.getElementById("root")
); //渲染成真实的dom 渲染到一个指定节点上
