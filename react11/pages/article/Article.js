import React from "react";

import "./style.css";
// 因为此页只负责展示 所以就没有必要用类组件 只用一个函数组件(视图组件)就可以了
const Article = ({ match, history }) => {
  //   一般是根据url拿到文章id然后发送ajax请求
  // 向后端请求服务器 然后向数据库上拿取对应id文章的数据
  return (
    <div className="article">
      <div>
        文章ID：
        <span>{match.params.id}</span>
      </div>
      <div>
        文章作者：
        <span>{history.location.state.author}</span>
      </div>
      <div>
        文章标题：
        <span>{history.location.state.article}</span>
      </div>
    </div>
  );
};
export default Article;
