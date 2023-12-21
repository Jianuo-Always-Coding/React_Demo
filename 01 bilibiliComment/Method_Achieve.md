# bilibili 评论区复现

## 实现列表渲染

1. 使用 useState()维护评论列表
2. 使用 map 方法对列表数据进行渲染（加上 key）

```jsx
const [list,setList] = useState(defaultList);

return(
    {list.map(item => (
        <div className="reply-item">...</div>
    ))}
)
```

## 实现删除功能

1. 条件渲染，只有 UID 相同，才能显示删除标签
2. 更新列表，重新渲染

```jsx
const onDelete = (rpid) => {
  // 如果要删除数组中的元素，需要调用 filter 方法，并且一定要调用 setList 才能更新状态
  setList(list.filter((item) => item.rpid !== rpid));
};

{
  user.uid === item.user.uid && (
    <span className="delete-btn" onClick={() => onDelete(item.rpid)}>
      删除
    </span>
  );
}
```

## tab 切换

```jsx
const tabs = [
  { type: "hot", text: "最热" },
  { type: "time", text: "最新" },
];
const [type, setType] = useState("hot"); // type is initialize a value but never used

// tab切换功能
// 1.点击谁就把谁的type记记录下来
// 2．通过记录的type和每一项遍历时的type做匹配 控制激活类名的显示
return (
  tabs.map((item) => (
    <span
      key={item.type}
      className={item.type === type ? "nav-item active" : "nav-item"}
      onClick={() => handleTabChange(item.type)}>
        {item.text}
    </span>
  ));
)
```

## 重新渲染评论列表

```jsx
import orderBy from "lodash/orderBy";

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
```

## 实现评论发布功能
1. 获取评论内容
2. 点击发布按钮发布评论

```jsx
const [content, setContent] = useState("");

const publishComment = () => {
  setList([
    ...list,
    {
      rpid: 100,
      user: {
        uid: "30009257",
        avatar,
        uname: "黑马前端",
      },
      content: content,
      ctime: "10-19 09:00",
      like: 66,
    },
  ]);
};

return (
  <>
    {/* 评论框 */}
    <textarea
      className="reply-box-textarea"
      placeholder="发一条友善的评论"
      value={content}
      onChange={(e) => {
        setContent(e.target.value);
      }}
    />
    {/* 发布按钮 */}
    <div className="send-text" onClick={publishComment}>
      发布
    </div>
  </>
);
```

## 评论发布的 ID 处理和时间处理
1. rpid要求一个唯一的随机数 - uuid
2. ctime要求以当前时间为标准，生成固定格式 - dayjs

```
npm install uuid
npm install dayjs
```

```jsx
import { v4 as uuidv4 } from "uuid";
uuidv4();

// update create comment
const publishComment = () => {
  setList([
    ...list,
    {
      rpid: uuidV4(),
      user: {
        uid: "30009257",
        avatar,
        uname: "黑马前端",
      },
      content: content,
      ctime: dayjs(new Date()).format("MM-DD hh:mm"),
      like: 66,
    },
  ]);
};
```

## 清空内容并重新聚焦
1. 清空内容-把input框的value状态设置为空串
2. 重新聚焦 - 拿到input的DOM元素，调用focus方法

```jsx
const inputRef = useState(null)

const publishComment = () => {
    ...

    // 1. 清空输入框内容
    setContent('')
    // 2. 重新聚焦 - dom(useRef) - focus
    inputRef.current.focus()
}

return (
  {/* 评论框 */}
  <textarea
    className="reply-box-textarea"
    placeholder="发一条友善的评论"
    value={content}
    ref={inputRef}
    onChange={(e) => {
      setContent(e.target.value);
    }}/>
)
```

## 优化需求 -- API实现
1. 使用请求接口的方式获取评论列表并渲染 - json server + asios
2. 使用自定义Hook函数封装数据请求的逻辑
3. 把评论中的每一项抽象成一个独立的组件实现渲染 - useEffect

```jsx
npm i json-server -D
```
```jsx
const [list, setList] = useState([]);

  useEffect(()=>{
    async function getList() {
      const res = await axios.get("http://localhost:3004/list");
      setList(res.data)
    }
    getList()
  },[])
```

## 自定义Hook函数封装数据
1. 编写一个use打头的函数
2. 函数内部编写封装逻辑
3. return 组件中用到的状态和方法
4. 组件中调用函数解构赋值使用

```jsx
function useGetList() {
  const [list, setList] = useState([]);
  useEffect(() => {
    async function getList() {
      const res = await axios.get("http://localhost:3004/list");
      setList(res.data);
    }
    getList()
  }, [])

  return {
    list,
    setList
  }
}

function App() {
  ...
  const {list, setList} = useGetList()
  ...
}
```

## 封装评论项Item组件
抽象原则： App作为“智能组件”负责数据的获取，item作为“UI组件”负责数据的渲染