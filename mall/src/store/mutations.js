export default {
  changeCarCount(state, payload) {
    payload.count ++;
  },
  addToCar(state, payload) {
    payload.count = 1;
    payload.checked = true; // 默认商品加入购物车时是选中状态
    state.carList.push(payload);
  }
};