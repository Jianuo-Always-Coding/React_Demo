import BarChart from "./components/BarChart";

/* 
    也可以使用useRef来进行操作，避免使用原生React操作
    在头文件引入 useRef from ‘react’
    在Home下加入 const chartRef = useRef(null)
    更改 chartDOM  = chartRef.current
    将div中的id改为 ref={chartRef}
*/

const Home = () => {
  return (
    <div>
      <BarChart title={"三大框架满意度"} />
      <BarChart title={"三大框架使用度"} />
    </div>
  );
};

export default Home;
