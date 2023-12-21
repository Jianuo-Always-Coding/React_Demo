import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 账单列表相关store
const billStore = createSlice({
  name: "bill",
  initialState: {
    billList: [],
  },
  reducers: {
    // 同步修改方法
    setBillList(state, action) {
      state.billList = action.payload;
    },
    //同步添加账单方法
    addBill(state, action) {
      state.billList.push(action.payload);
    },
  },
});

// 解构actionCreater
const { setBillList, addBill } = billStore.actions;

// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get("http://localhost:8888/ka");

    // 调用dispatch函数提交action
    dispatch(setBillList(res.data));
  };
};

const addBillList = (data) => {
  return async (dispatch) => {
    const res = await axios.post("http://localhost:8888/ka", data);

    // 调用dispatch函数提交action
    dispatch(addBill(res.data));
  };
}

export { getBillList, addBillList };

// 导出reducer
const reducer = billStore.reducer;

export default reducer;
