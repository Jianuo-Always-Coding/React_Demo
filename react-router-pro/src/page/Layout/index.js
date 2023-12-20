import { Link, Outlet } from "react-router-dom";

const Layout = () => {
    return (
      <div>
        我是一级路由layout组件
        <Link to="/">To Board</Link>
        <Link to="/about">To About</Link>
        {/* 配置二级路由出口 */}
        <Outlet />
      </div>
    );
}

export default Layout;