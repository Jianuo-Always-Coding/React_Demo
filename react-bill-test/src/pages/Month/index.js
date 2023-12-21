import { NavBar, DatePicker } from "antd-mobile";
import "./index.scss";
import { useMemo, useState } from "react";
import classNames from "classnames";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import _ from "lodash";

const Month = () => {
  // 控制弹窗的显示和关闭
  const [dateVisible, setDateVisible] = useState(false);
  const [currentMonthList, setMonthList] = useState([]);

  // 按月做数据的分组
  const billList = useSelector((state) => state.bill.billList);
  // 按月分组
  const monthGroup = useMemo(() => {
    // return 出去计算后的值
    return _.groupBy(billList, (item) => dayjs(item.date).format("YYYY-MM"));
  }, [billList]);
  // console.log(monthGroup);

  const monthResult = useMemo(() => {
    //支出， 收入， 结余
    const pay = currentMonthList
      .filter((item) => item.type === "pay")
      .reduce((a, c) => a + c.money, 0);
    const income = currentMonthList
      .filter((item) => item.type === "income")
      .reduce((a, c) => a + c.money, 0);
    return {
      pay,
      income,
      total: pay + income,
    };
  }, [currentMonthList]);

  // 确认回调
  const onConfirm = (date) => {
    setDateVisible(false);
    // 其他逻辑
    const formatDate = dayjs(date).format("YYYY-MM");
    setCurrentDate(formatDate);
    setMonthList(monthGroup[formatDate]);
    console.log(currentMonthList);
  };
  const [currentDate, setCurrentDate] = useState(() => {
    return dayjs(new Date()).format("YYYY-MM");
  });

  return (
    <div className="monthlyBill">
      <NavBar className="nav" backArrow={false}>
        月度收支
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
                {Math.abs(monthResult.pay).toFixed(2)}
              </span>
              <span className="type">支出</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.income.toFixed(2)}</span>
              <span className="type">收入</span>
            </div>
            <div className="item">
              <span className="money">{monthResult.total.toFixed(2)}</span>
              <span className="type">结余</span>
            </div>
          </div>
          {/* 时间选择器 */}
          <DatePicker
            className="kaDate"
            title="记账日期"
            precision="month"
            visible={dateVisible}
            onCancel={() => setDateVisible(false)}
            onConfirm={onConfirm}
            onClose={() => setDateVisible(false)}
            max={new Date()}
          />
        </div>
      </div>
    </div>
  );
};

export default Month;
