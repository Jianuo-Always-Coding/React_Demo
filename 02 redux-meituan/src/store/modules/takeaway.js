import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// 编写Store
const foodsStore = createSlice({
  name: "foods",
  initialState: {
    // 商品列表
    foodsList: [],
    activeIndex: 0,
    cartList: [],
  },
  reducers: {
    // 更改商品列表
    setFoodsList(state, action) {
      state.foodsList = action.payload;
    },
    // 更改activeIndex
    changeActiveIndex(state, action) {
      state.activeIndex = action.payload;
    },
    // 添加购物车
    addCart(state, action) {
      // Check if the item already exists in cartList
      const itemIndex = state.cartList.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex !== -1) {
        // If the item exists, increment the count
        state.cartList[itemIndex].count++;
      } else {
        // If the item doesn't exist, initialize count to 1 and push it to cartList
        const newItem = { ...action.payload, count: 1 };
        state.cartList.push(newItem);
      }
    },
    // count增
    increCount(state, action) {
      // 关键点：找到当前要修改谁的count id
      const item = state.cartList.find((item) => item.id === action.payload.id);
      item.count++;
    },
    // count减
    decreCount(state, action) {
      // 关键点：找到当前要修改谁的count id
      const item = state.cartList.find((item) => item.id === action.payload.id);
      item.count--;
      if (item.count === 0) {
        const updatedCartList = state.cartList.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );
        state.cartList = updatedCartList;
      }
    },
    // 清除购物车
    clearCart(state) {
      state.cartList = [];
    },
  },
});

// 异步获取部分
const {
  setFoodsList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
} = foodsStore.actions;
const fetchFoodsList = () => {
    return async (dispatch) => {
        // 编写异步逻辑
        const res = await axios.get("http://localhost:3004/takeaway");

        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data))
    }
}

export {
  fetchFoodsList,
  changeActiveIndex,
  addCart,
  increCount,
  decreCount,
  clearCart,
};
const reducer = foodsStore.reducer
export default reducer