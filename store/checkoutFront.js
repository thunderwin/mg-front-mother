export const state = () => ({
  cartInfo: ""
});

export const getters = {};
export const mutations = {
  setCartInfo(state, v) {
    state.cartInfo = v;
  }
};
export const actions = {



  async updateShippingAddress({ dispatch, state, commit }, obj) {
    let r = await this.$axios
      .post("/api/checkout/updateShippingAddress", {
        checkoutId: state.cartInfo.id,
        shippingAddress: obj.shippingAddress
      })
      .then();
    if (r.id) {
      commit("setCartInfo", r);
    }
  },

  async addCart({ dispatch, state, commit }, obj) {
    if (state.cartInfo.id) {
      let r = await this.$axios
        .post("/api/cart/add", {
          variantId: obj.variantId,
          cartId: state.cartInfo.id
        })
        .then();
      if (r.id) {
        dispatch("info/success", "成功", { root: true });
        commit("setCartInfo", r);
        return r.id;
      }
    } else {
      let r = await this.$axios.post("api/cart/create-checkout", obj).then();
      console.dir("加入购物车成功后返回");
      console.log(JSON.stringify(r));
      if (r.id) {
        dispatch("info/success", "成功", { root: true });
        commit("setCartInfo", r);
        return r.id;
      }
    }
  }
};
