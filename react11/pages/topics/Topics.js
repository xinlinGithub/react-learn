import React, { Component } from "react";
import "./style.css";
import NavLink from "react-router-dom/NavLink";
class Topics extends Component {
  state = {
    articleList: JSON.parse(localStorage.getItem("article")) || []
  };
  render() {
    return (
      <div>
        <ul className="topics">
          {this.state.articleList.map(item => (
            <li key={item.id} className="topic-box">
              <span>{item.author}</span>
              {/* 通过下面这种方式去传值 只有在页面从此页面跳到目标页面时的那一刻才能获得 
              如果是从一个位置页面转到目标页面则会报错
              所以这只是一个例子 一般不用这种方法去跳 */}
              <NavLink to={{
                pathname: "/article" + item.id,
                state: {
                  author: item.author,
                  article: item.article
                }
              }}>{item.article}</NavLink>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Topics;
