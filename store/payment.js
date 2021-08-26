export const state = () => ({});

export const getters = {};
export const mutations = {};
export const actions = {
  async create({ commit, dispatch, state, rootState }) {
    if (rootState.checkout.orderInfo.id) {
      let r = await this.$axios
        .post("/api/payment/paypalCreate", {
          draftOrderId: rootState.checkout.orderInfo.id,
        })
        .then();

      let url = r.links.find((x) => x.rel === "approve").href;
      window.location.href = url; // 这个不会让google 显示警告

      console.dir("支付创建成功");
      console.log(JSON.stringify(r));
    } else {
      console.dir("没订单，无法更新啊");
    }
  },

  async createPaypalExpressToken({ commit, dispatch, state, rootState }) {
    let code = this.$i18n.locale;
    let cartId = rootState.cart.cartId[code];

    let r = await this.$axios.post("/api/payment/createPaypalExpressToken", {
      cart_id: cartId,
      code: "paypal_express",
      urls: {
        return_url: "https://www.homeremodeldepot.com/checkout/success",
        cancel_url: "https://www.homeremodeldepot.com/shipping-payment",
      },
    });

    console.log("%c 获取的paypal支付token", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
  },
};
