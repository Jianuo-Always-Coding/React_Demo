import { createSlice } from "@reduxjs/toolkit"
import axios from "axios"

// 编写Store
const foodsStore = createSlice({
  name: "foods",
  initialState: {
    // 商品列表
    foodsList: [],
    activeIndex: 0,
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
  },
});

// 异步获取部分
const {setFoodsList, changeActiveIndex} = foodsStore.actions
const fetchFoodsList = () => {
    return async (dispatch) => {
        // 编写异步逻辑
        const res = await axios.get("http://localhost:3004/takeaway");

        // 调用dispatch函数提交action
        dispatch(setFoodsList(res.data))
    }
}

export {fetchFoodsList, changeActiveIndex}
const reducer = foodsStore.reducer
export default reducer