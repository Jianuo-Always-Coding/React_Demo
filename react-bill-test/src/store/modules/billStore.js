import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// 账单列表相关store
const billStore = createSlice({
  name: 'bill',
  initialState: {
    billList: [],
  },
  reducers: {
    setBillList(state, action) {
      state.billList = action.payload;
    },
  },
});

// 解构actionCreater
const { setBillList } = billStore.actions;

// 编写异步
const getBillList = () => {
  return async (dispatch) => {
    // 编写异步逻辑
    const res = await axios.get("http://localhost:8888/ka");

    // 调用dispatch函数提交action
    dispatch(setBillList(res.data));
  };
};
export { getBillList };

// 导出reducer
const reducer = billStore.reducer;

export default reducer;
