import { useEffect, useState } from "react";
import "./App.css";
import avatar from "./images/bozai.png";
import orderBy from "lodash/orderBy";
import classnames from "classnames";
import dayjs from "dayjs";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

function useGetList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getList() {
      const res = await axios.get("http://localhost:3004/list");
      setList(res.data);
    }
    getList();
  }, []);

  return {
    list,
    setList,
  };
}

const defaultList = [
  {
    // 评论id
    rpid: 3,
    // 用户信息
    user: {
      uid: "13258165",
      avatar:
        "https://scontent-ord5-1.xx.fbcdn.net/v/t39.30808-6/294061446_603087361175847_8020365116706435534_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=3635dc&_nc_ohc=81vCK6My598AX_8IkK6&_nc_ht=scontent-ord5-1.xx&oh=00_AfAdE0VwCnbF5xQYkJbrujiR7ufhwG6x-lLFMDkEgLODug&oe=65837A38",
      uname: "周杰伦",
    },
    // 评论内容
    content: "哎哟，不错哦",
    // 评论时间
    ctime: "10-18 08:15",
    like: 88,
  },
  {
    rpid: 2,
    user: {
      uid: "36080105",
      avatar:
        "https://p3.itc.cn/q_70/images03/20221103/28900d1e03a9420aa83224bd83a1086d.jpeg",
      uname: "许嵩",
    },
    content: "我寻你千百度 日出到迟暮",
    ctime: "11-13 11:29",
    like: 88,
  },
  {
    rpid: 1,
    user: {
      uid: "30009257",
      avatar,
      uname: "黑马前端",
    },
    content: "学前端就来黑马",
    ctime: "10-19 09:00",
    like: 66,
  },
];
// 当前登录用户信息
const user = {
  // 用户id
  uid: "30009257",
  // 用户头像
  avatar,
  // 用户昵称
  uname: "黑马前端",
};

// 导航 Tab 数组
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];
// 2. 使用组件
const App = () => {
  const [type, setType] = useState("hot"); // type is initialize a value but never used
  const [content, setContent] = useState("");
  const inputRef = useState(null);

  const { list, setList } = useGetList();
  // const [list, setList] = useState([]);

  // useEffect(()=>{
  //   async function getList() {
  //     const res = await axios.get("http://localhost:3004/list");
  //     setList(res.data)
  //   }
  //   getList()
  // },[])

  const onDelete = (rpid) => {
    setList(list.filter((item) => item.rpid !== rpid));
  };

  // tab 高亮切换
  const handleTabChange = (type) => {
    setType(type);
    let newList;
    if (type === "time") {
      // 按照时间降序排序
      // orderBy(对谁进行排序, 按照谁来排, 顺序)
      newList = orderBy(list, "ctime", "desc");
    } else {
      // 按照喜欢数量降序排序
      newList = orderBy(list, "like", "desc");
    }
    setList(newList);
  };

  const publishComment = () => {
    setList([
      ...list,
      {
        rpid: uuidv4(),
        user: {
          uid: "30009257",
          avatar,
          uname: "黑马前端",
        },
        content: content,
        ctime: dayjs(new Date()).format("MM-DD h:mm"),
        like: 66,
      },
    ]);
    // console.log(this.rpid)
    // 1. 清空输入框内容
    setContent("");
    // 2. 重新聚焦 - dom(useRef) - focus
    inputRef.current.focus();
  };

  // 封装评论列表
  function Item({ item, onDelete }) {
    return (
      <div className="reply-list">
        {/* 评论项 */}
        <div className="reply-item">
          {/* 头像 */}
          <div className="root-reply-avatar">
            <div className="bili-avatar">
              <img
                className="bili-avatar-img"
                alt="用户头像"
                src={item.user.avatar}
              />
            </div>
          </div>

          <div className="content-wrap">
            {/* 用户名 */}
            <div className="user-info">
              <div className="user-name">{item.user.uname}</div>
            </div>
            {/* 评论内容 */}
            <div className="root-reply">
              <span className="reply-content">{item.content}</span>
              <div className="reply-info">
                {/* 评论时间 */}
                <span className="reply-time">{item.ctime}</span>
                {/* 评论数量 */}
                <span className="reply-time">点赞数:{item.like}</span>
                {user.uid === item.user.uid && (
                  <span
                    className="delete-btn"
                    onClick={() => onDelete(item.rpid)}
                  >
                    删除
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {tabs.map((item) => (
              <span
                key={item.type}
                // className={item.type === type ? "nav-item active" : "nav-item"}
                className={classnames("nav-item ", {
                  active: type === item.type,
                })}
                onClick={() => handleTabChange(item.type)}
              >
                {item.text}
              </span>
            ))}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              ref={inputRef}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send" onClick={publishComment}>
              <div className="send-text">发布</div>
            </div>
          </div>
        </div>

        {/* 评论列表 */}
        {list.map((item) => (
          <Item item={item} key={item.rpid} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default App;
