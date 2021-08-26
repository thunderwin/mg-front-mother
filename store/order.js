export const state = () => ({
  orderList: []
});

export const getters = {
  getOrderByIncrementId: state => increment_id => {
    return state.orderList.find(x => x.increment_id === increment_id);
  }
};

export const mutations = {
  setOrders(state, v) {
    state.orderList = v;
  }
};

export const actions = {
  async searchOrders(
    { commit },
    { increment_id, payment_ref_id, card_last_4 }
  ) {
    if (!!increment_id) {
      console.log("%c increment_id", "color:green;font-weight:bold");
      console.log(JSON.stringify(increment_id));

      let r = await this.$axios
        .post("/api/order/orderByIncrementId", {
          increment_id: increment_id
        })
        .then();
      console.log("%c 按照订单id查询到的订单", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      // return r.items;
      commit("setOrders", r.items);
    }
  },
  async getOrderById({ commit }, { orderId }) {
    let r = await this.$axios
      .post("/api/order", {
        orderId: orderId
      })
      .then();

    console.log("%c order", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    return r;
  }
};
