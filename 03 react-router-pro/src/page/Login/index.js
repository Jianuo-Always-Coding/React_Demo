import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div>
      This is a Login Page
      {/* 声明式写法 */}
      <Link to="/article">Jump to Article page</Link>
      {/* 命令式写法 */}
      <button onClick={() => navigate("/article")}>Jump to Article page</button>
      <button onClick={() => navigate("/article?id=101&name=jack")}>searchParams传参</button>
      <button onClick={() => navigate("/article/102/jason")}>Params传参</button>

    </div>
  );
};

export default Login;
