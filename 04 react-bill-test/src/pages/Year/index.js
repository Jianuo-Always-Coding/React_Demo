import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";
import MonthBill from "./components/MonthBill";

const Year = () => {
  // 控制弹窗的显示和关闭
  const [dateVisible, setDateVisible] = useState(false);
  const [currentYearList, setYearList] = useState([]);



  // 按年做数据的分组
  const billList = useSelector((state) => state.bill.billList);
  // 按月分组
  const yearGroup = useMemo(() => {
    // return 出去计算后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY"));
  }, [billList]);
  // console.log(yearGroup);

  const yearResult = useMemo(() => {
    if (!currentYearList) {
      // handle the case where currentYearList is undefined
      return { pay: 0, income: 0, total: 0 };
    }
    //支出， 收入， 结余
    const pay = currentYearList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentYearList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [currentYearList]);

  // 确认回调
  const onConfirm = (date) => {
    setDateVisible(false);
    // 其他逻辑
    const formatDate = dayjs(date).format("YYYY");
    setCurrentDate(formatDate);
    setYearList(yearGroup[formatDate]);
    // console.log(currentYearList);
  };

  // 初始化的时候将当前页面的统计数据显示出来
  useEffect(() => {
    const nowDate = dayjs(new Date()).format("YYYY");
    // console.log(nowDate);
    onConfirm(nowDate);
    // 边界值控制
    if (yearGroup.length > 0) {
      setYearList(yearGroup[nowDate]);
    }
  }, [yearGroup]);

  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY");
  });

  // 当前月按照日来分组
  // 按日分组
  const dayGroup = useMemo(() => {
    // return 出去计算后的值
    const groupData = _.groupBy(currentYearList, (item) =>
      dayjs(item.date).format("YYYY-MM")
    );
    const keys = Object.keys(groupData);
    return {
      groupData,
      keys,
    };
  }, [currentYearList]);
  console.log(dayGroup);

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        年度账单
      </NavBar>
      <div className="content">
        <div className="header">
          {/* 时间切换区域 */}
          <div className="date" onClick={() => setDateVisible(true)}>
            <span className="text">{currentDate + ""}账单</span>
            {/* 使用classnames进行更改 根据当前弹窗打开状态 判断expand类名是否存在 */}

            <span
              className={classNames("arrow", dateVisible && "expand")}
            ></span>
          </div>
          {/* 统计区域 */}
          <div className="twoLineOverview">
            <div className="item">
              <span className="money">
                {Math.abs(yearResult.pay).toFixed(2)}
              </span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{yearResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{yearResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="year"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>

        {/* 单月列表统计 */}
        {dayGroup.keys.map((key) => {
          return (
            <MonthBill
              key={key}
              date={key}
              billList={dayGroup.groupData[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Year;
