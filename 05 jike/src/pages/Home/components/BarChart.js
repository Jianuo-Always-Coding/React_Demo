// 封装柱状图组件
import * as echarts from "echarts";
import { useEffect, useRef } from "react";
// 1. 把功能代码放到组件中
// 2. 把可变参数抽象成prop参数

const BarChart = ({title}) => {
  const chartRef = useRef(null);
  useEffect(() => {
    // 保证dom可用 才进行图表的渲染
    // 1. 获取渲染图表的DOM节点
    const chartDom = chartRef.current;

    // 1. 生成实例
    const myChart = echarts.init(chartDom);

    // 2. 准备图表参数
    const option = {
      title: {
        text: title,
      },
      xAxis: {
        type: "category",
        data: ["Vue", "React", "Angular"],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [10, 40, 70],
          type: "bar",
        },
      ],
    };

    //4. 使用图表完成图表渲染
    option && myChart.setOption(option);
  }, [title]);
  return <div ref={chartRef} style={{ width: "400px", height: "300px" }}></div>;
};

export default BarChart;
