// 封装高阶组件 封装 AuthRoute 路由鉴权高阶
// 实现未登录拦截，并跳转到登录页面 
// 实现思路：判断本地是否有token，如果有，就返回子组件，
// 否则就重定向到登录Login

import { getToken } from "@/utils";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isToken = getToken();
  if (isToken) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default AuthRoute;