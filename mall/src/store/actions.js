export default {
  addCar(context, payload) {
    return new Promise((resolve, reject) => {
      let isExistProduct = context.state.carList.find(product => product.iid === payload.iid);
      if (isExistProduct) {
        context.commit('changeCarCount', isExistProduct);
        resolve('当前商品数量+1');
      } else {
        context.commit('addToCar', payload);
        reject('加入购物车');
      }
    });
  }
};