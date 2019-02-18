import React, { Component } from "react";
import "./style.css";
class Home extends Component {
  authorText = React.createRef();
  articleText = React.createRef();
  componentDidMount() {
    // 渲染的时候接收到登录后返回的参数 方便获取上次输入的数据
    const {location} = this.props;
    const retState = location.state;
    if(retState) {
      this.authorText.current.value = retState.author;
      this.articleText.current.value = retState.article;
    }
  }
  render() {
    return (
      <div className="home">
        <h4>发表话题：</h4>
        <form onSubmit={this.submitText}>
          <div className="form-box">
            <label htmlFor="author">作者姓名：</label>
            <input id="author" ref={this.authorText} required />
          </div>
          <div className="form-box">
            <label htmlFor="article">文章标题：</label>
            <input id="article" ref={this.articleText} required />
          </div>
          {/* 当点击button提交按钮时 form表单标签就自动提交 */}
          <button className="confirm-btn">提交</button>
        </form>
      </div>
    );
  }
  submitText = e => {
    // 取消默认事件  防止默认跳转
    e.preventDefault();
    const author = this.authorText.current.value;
    const article = this.articleText.current.value;
    const id = Math.floor(Math.random() * 1000000000000000);
// 看登录了没有 如果登陆了 就直接将数据存到localStorage中 再跳转到话题页
// 如果没有登录 就先跳转到登录页 跳转时再把数据传递过去 登陆后再把数据返回过来 直接返回原来页

    const isLogin = document.cookie.includes("login=true");
    if (isLogin) {
      this.setArticleStorage(author, article, id);
    } else {
      this.props.history.push({
        pathname: "/login",
        state: {
          author,
          article,
          id,
          from: this.props.location.pathname
        },
      
      });
    }
  };

  setArticleStorage = (author, article, id) => {
    const articleList = JSON.parse(localStorage.getItem("article")) || [];
    articleList.unshift({ author, article, id });
    localStorage.setItem("article", JSON.stringify(articleList));
    //跳转指定页面 this.props 里面有好几个跳转的属相或方法 可以打印一看 再试一试
    this.props.history.push("/topics");
  };
}

export default Home;
