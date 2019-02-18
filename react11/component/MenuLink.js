import React from "react";
import { Route } from "react-router-dom";
// Route 渲染组件的三种方式
// component 最常用 只有当location中的pathname 与路由中的path匹配时才会加载 对应的组件
// 他是直接调用React.createElement()函数新建一个元素
// render 路由匹配route上的path后函数就会调用，就是由你跳转到的路由location中的pathname与path相匹配
// 然后就会调用该路由的render函数渲染组件 其他的匹配不到就不渲染
// 他是直接调用现有组件中的render函数去返回元素
// children 不管现在的路由是否匹配 都会渲染对应的组件 只是匹配不到的渲染不出来对应的props
// route的render与组件的render都是渲染组件 但前者的参数和后者的不同
// 前者是由history,location之类的 后者是组件上传来的
// 类组件方式写
// class MenuLink extends Component {
//   render() {
//     //   这个this.props是组件传回来的参数
//     return (
//       <Route
//         path={this.props.to}
//         exact
//         children={p => {
//           // 这个p是渲染时产生的参数 可以实现页面跳转
//           return (
//             <span
//               onClick={() => {
//                 p.history.push(this.props.to);
//               }}
//               className={p.match ? "active" : ""}
//             >
//               {this.props.children}
//             </span>
//           );
//         }}
//       />
//     );
//   }
// }

//函数组件写法
// 最外层箭头函数的参数就是组件传回来的参数
const MenuLink = props => {
  return (
    <Route
      path={props.to}
      exact
      children={p => {//只有匹配到了才有这个match匹配不到没有
        return <span className={p.match ? "active" : ""} onClick={() => {
            p.history.push(props.to);
        }}>{props.children}</span>;
      }}
    />
  );
};
export default MenuLink;
