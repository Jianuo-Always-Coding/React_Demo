// // 测试token是否成功注入
// import { request } from "@/utils";
// import { useEffect } from "react";

// const Layout = () => {
//   useEffect(() => {
//     request.get("/user/profile");
//   }, []);
//   return <div>This is LayOut page</div>;
// };

// export default Layout;

import { Layout, Menu, Popconfirm } from "antd";
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./index.scss";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { fetchUserInfo, clearUserInfo } from "@/store/modules/user";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Header, Sider } = Layout;

const items = [
  {
    label: "首页",
    key: "/",
    icon: <HomeOutlined />,
  },
  {
    label: "文章管理",
    key: "/article",
    icon: <DiffOutlined />,
  },
  {
    label: "创建文章",
    key: "/publish",
    icon: <EditOutlined />,
  },
];

const GeekLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onMenuClick = (value) => {
    // console.log(value);
    const path = value.key;
    navigate(path);
  };

  // 反向高亮
  const location = useLocation()
//   console.log(location.pathname);
  const selectedKey = location.pathname;
  

  // 获取用户信息
  useEffect(() => {
    dispatch(fetchUserInfo())
  }, [dispatch])
  const name = useSelector(state => state.user.userInfo.name) 

  // 退出登陆确认回调
  const onConfirm = () => {
    dispatch(clearUserInfo());
    navigate('/login')
  }


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" okText="退出" cancelText="取消" onConfirm={onConfirm}>
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={selectedKey}
            onClick={onMenuClick}
            items={items}
            style={{ height: "100%", borderRight: 0 }}
          ></Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};
export default GeekLayout;
