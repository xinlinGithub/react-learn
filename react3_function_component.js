import React, { Fragment } from "react";
// 组件实现dom复用
// 函数组件 只能实现功能简单的无状态组件 仅仅用来展示 里面没有自己的数据 也没有this
// 也没有生命周期
function TextList(props) {
  const { list } = props; //解构赋值 {}里面的值得对应起来
  return (
    <Fragment>
      <div className="wrapper">
        <div className="search-title-box">
          <h5 className="search-title">搜索热点</h5>
          <span className="refresh">换一换</span>
        </div>
        <ul className="top-list-container">
          {list.map((item, index) => {
            let indexStyle = {};
            switch (index) {
              case 0:
                indexStyle.backgroundColor = "#f54545";
                break;
              case 1:
                indexStyle.backgroundColor = "#ff8547";
                break;
              case 2:
                indexStyle.backgroundColor = "#ffac38";
                break;
              default:
                break;
            }
            return (
              //尽量key值不要用index值 key值就是他们的名字 不相同就行
              //如果用index移动了元素之后 就会删除重新渲染 浪费性能
              //而用别的值只会移动 不会重新渲染 节省性能
              <li className="top-list" key={item.id}>
                <div className="top-title">
                  <span className="hot-index" style={indexStyle}>
                    {item.id + 1}
                  </span>
                  <a className="topic-title">{item.title}</a>
                  <span className="topic-new">{item.new ? "新" : ""}</span>
                </div>
                <div className="hot-degree">
                  <span>{item.hot}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}

export default TextList;

// function Component() {//首字母要大写
//     return (
//       <div>fsdgsg</div>
//     )
//   }
render(//在哪儿用 就在哪儿引
  <>
    <TagList list={topList} />
    <TagList list={topList} />
  </>,
  document.getElementById("root")
); //渲染成真实的dom
