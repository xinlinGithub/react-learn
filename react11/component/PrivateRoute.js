import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// 路由校验组件
// 组件渲染的时候就会自动的调用他自己的render函数 看渲染成什么组件
// 所以在组件中写个render函数依然生效 必须返回一个可渲染的组件
const PrivateRoute = ({component: Component, ...props}) => {
    return <Route {...props} render={(p) => {
        // p相当于类组件中的this.props
        const isLogin = document.cookie.includes("login=true");
        if(isLogin) {
            return <Component />;
        }else {
            alert("你尚未登录，请返回登录！")
            return <Redirect to={{//通过这种传参方式 可以在跳转到的那个页面 通过this.props接收传过去的数据
                pathname: props.redPath,
                state: {
                    from: p.location.pathname
                }
            }}/>
        }
    }}></Route>
}

export default PrivateRoute;