import { Button, DatePicker, Input, NavBar } from "antd-mobile";
import Icon from "@/components/Icon";
import "./index.scss";
import classNames from "classnames";
import { billListData } from "@/contants";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addBillList } from "@/store/modules/billStore";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";


const New = () => {
  const navigate = useNavigate();
  const [billType, setBillType] = useState('pay') // pay 代表支出， income 代表收入
  //收集账单类型
  const [useFor, setUseFor] = useState('')
  const dispatch = useDispatch()

  const [money, setMoney] = useState(0)

  const moneyChange = (value) => {
    setMoney(value)
  }

  // 保存账单
  const saveBill = () => {
    const data = {
      type: billType,
      money: billType==='pay'? -money:money,
      date: date,
      useFor: useFor
    }
    // console.log(data);
    dispatch(addBillList(data))
    

  }

  // 控制时间打开关闭
  const [dateVisible, setDateVisible] = useState(false)
  const [date, setDate] = useState()
  // 确认选择时间
  const dateConfirm = (value) => {
    // console.log(value);
    setDate(value)
    setDateVisible(false)

  }
  return (
    <div className="keepAccounts">
      <NavBar className="nav" onBack={() => navigate(-1)}>
        记一笔
      </NavBar>

      <div className="header">
        <div className="kaType">
          <Button
            shape="rounded"
            className={classNames(billType === "pay" ? "selected" : "")}
            onClick={() => setBillType("pay")}
          >
            支出
          </Button>
          <Button
            className={classNames(billType === "income" ? "selected" : "")}
            shape="rounded"
            onClick={() => setBillType("income")}
          >
            收入
          </Button>
        </div>

        <div className="kaFormWrapper">
          <div className="kaForm">
            {/* 时间选择器 */}
            <div className="date" onClick={() => setDateVisible(true)}>
              <Icon type="calendar" className="icon" />
              <span className="text">{dayjs(date).format("YYYY-MM-DD")}</span>
              <DatePicker
                className="kaDate"
                title="记账日期"
                max={new Date()}
                visible={dateVisible}
                onConfirm={dateConfirm}
              />
            </div>
            <div className="kaInput">
              <Input
                className="input"
                placeholder="0.00"
                type="number"
                value={money}
                onChange={moneyChange}
              />
              <span className="iconYuan">¥</span>
            </div>
          </div>
        </div>
      </div>

      <div className="kaTypeList">
        {/* 数据区域 */}
        {billListData[billType].map((item) => {
          return (
            <div className="kaType" key={item.type}>
              <div className="title">{item.name}</div>
              <div className="list">
                {item.list.map((item) => {
                  return (
                    <div
                      className={classNames(
                        "item",
                        useFor === item.type ? "selected" : ""
                      )}
                      key={item.type}
                      onClick={() => setUseFor(item.type)}
                    >
                      <div className="icon">
                        <Icon type={item.type} />
                      </div>
                      <div className="text">{item.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="btns">
        <Button className="btn save" onClick={saveBill}>
          保 存
        </Button>
      </div>
    </div>
  );
};

export default New;
