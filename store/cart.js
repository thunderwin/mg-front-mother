export const state = () => ({
  cartId: {
    // 不同的store 之间的cartid 不能混用
    cn: null,
    en: null,
    hk: null,
  },

  cart: {
    // 不同的store 之间的cartid 不能混用
    cn: null,
    en: null,
    hk: null,
  },

  cartQty: {
    cn: 0,
    en: 0,
    hk: 0,
  },

  avaliableShippingMethod: [],
  avaliablePaymentMethod: [],
});

export const getters = {
  cart: (state) => (code) => {
    let cart = state.cart;
    let finalCart = cart[code];
    return finalCart;
  },
};

export const mutations = {
  setCartId(state, { code, id }) {
    state.cartId[code] = id;
  },
  delCartId(state, { code }) {
    state.cartId[code] = null;
  },
  setCart(state, { code, cart }) {
    state.cart[code] = cart;
  },
  removeCart(state, code) {
    state.cartId[code] = "";
    state.cart[code] = "";
  },
  setCartQTY(state, { code, qty }) {
    state.cartQty[code] = qty;
  },

  setAvaliablePaymentMethod(state, { paymentMethod }) {
    state.avaliablePaymentMethod = paymentMethod;
  },
  setAvaliableShippingMethod(state, { shippingMethod }) {
    state.avaliableShippingMethod = shippingMethod;
  },
};

export const actions = {
  async startCheckout({ commit, state, dispatch }) {
    let code = this.$i18n.locale;
    let cartId = state.cartId[code];

    this.$router.push("/checkout/" + cartId);
  },

  async universalAddCart({ commit, state, dispatch }, { payload, item }) {
    let code = this.$i18n.locale;
    if (!state.cartId[code]) {
      await dispatch("guestGenCartId");
    }
    let cartId = state.cartId[code];

    let addCartPayload = {
      cart_id: cartId,
      cart_items: [
        {
          data: {
            sku: payload.sku,
            quantity: payload.qty,
          },
        },
      ],
    };

    if (payload.chosenOption) {
      // 如果有自定义属性
      addCartPayload.cart_items[0].customizable_options = Object.keys(
        payload.chosenOption
      ).map((x) => ({
        id: Number(x),
        value_string: JSON.stringify(payload.chosenOption[x]),
      }));
    }

    switch (item.__typename) {
      case "SimpleProduct":
        console.log("%c 简单产品", "color:green;font-weight:bold");

        let r = await this.$axios.post(
          "/api/guestcheckout/addSimpleProductsToCart",
          {
            input: addCartPayload,
          }
        );
        console.log("%c 加简单产品的结果", "color:green;font-weight:bold");
        console.log(JSON.stringify(r));
        if (r.addSimpleProductsToCart) {
          await dispatch("fetchCart", { cartId }); // 再次获取购物车
          commit("setCartPopup", true, { root: true });

          return true;
        }
      default:
        return true;
    }
  },

  async guestGenCartId({ commit }) {
    let r = await this.$axios.post("/api/guestcheckout/guestCart");
    console.log("%c 生产购物车ID", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    let code = this.$i18n.locale;

    commit("setCartId", {
      code: code,
      id: r.createEmptyCart,
    });
  },

  async getCrossSell({ commit, dispatch, state }) {
    let code = this.$i18n.locale;
    let carts = state.cart;
    let cart = carts[code];

    let obj = {};

    let crossSellSku = cart.items.map((x) => x.product.sku);

    // let filteredSkus = ['']
    // crossSellSku = crossSellSku.filter()

    console.log("%c crossSellSku", "color:green;font-weight:bold");
    console.log(JSON.stringify(crossSellSku));
    crossSellSku.forEach((x) => {
      if (obj[x] || obj[x] === 0) {
        obj[x] += 1;
      } else {
        obj[x] = 0;
      }
    });
    // console.log("%c crossSellSku", "color:green;font-weight:bold");
    // console.log(JSON.stringify(obj));

    let finalSkus = Object.keys(obj)
      .map((x) => ({
        sku: x,
        qty: obj[x],
      }))
      .sort((a, b) => a.qty - b.qty);

    console.log("%c finalSkus", "color:green;font-weight:bold");
    console.log(JSON.stringify(finalSkus));

    let sku = finalSkus[0].sku;

    return dispatch("product/related", { sku: sku }, { root: true }).then();
  },

  async fetchCart({ commit, state }, { cartId }) {
    let code = this.$i18n.locale;

    console.log("%c cartId", "color:green;font-weight:bold");
    console.log(JSON.stringify(cartId));

    let { cart } = await this.$axios.post("/api/checkout/cart", {
      cartId: cartId,
    });

    console.log("%c 拿到的购物车", "color:green;font-weight:bold");
    console.log(JSON.stringify(cart));

    if (!cart) {
      console.log("%c 没拿到购物车，清空", "color:green;font-weight:bold");

      commit("removeCart", code);
      commit("setCartQTY", { code, qty: 0 });
      return;
    }

    // dispatch("getCrossSell", { cart: r.cart });

    commit("setCart", {
      code: code,
      cart: cart,
    });

    commit("setCartQTY", {
      code: code,
      qty: cart.total_quantity,
    });

    return cart;
  },

  async applyCouponToCart({ commit, dispatch }, { cartId, couponCode }) {
    console.log("%c cartId, couponCode", "color:green;font-weight:bold");
    console.log(JSON.stringify(cartId, couponCode));

    let r = await this.$axios.post("/api/guestcheckout/guestCartCoupon", {
      input: {
        cart_id: cartId,
        coupon_code: couponCode,
      },
    });

    // {"applyCouponToCart":{"cart":{"applied_coupons":[{"code":"c001"}]}}}

    if (r.applyCouponToCart) {
      console.log("%c 使用促销成功", "color:green;font-weight:bold");
      dispatch("fetchCart", { cartId });
    }

    return r;
  },

  async removeCouponFromCart({ commit, state, dispatch }, { cartId }) {
    let r = await this.$axios.post("/api/guestcheckout/removeCouponFromCart", {
      input: {
        cart_id: cartId,
      },
    });

    console.log("%c 移除coupon结果", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    if (r.removeCouponFromCart) {
      console.log("%c 移除优惠券成功", "color:green;font-weight:bold");
      dispatch("fetchCart", { cartId });
    }
  },

  async updateCartItems(
    { commit, state, dispatch },
    { cart_item_id, quantity }
  ) {
    let code = this.$i18n.locale;
    let cartId = state.cartId[code];
    let r = await this.$axios.post("/api/guestcheckout/updateCartItems", {
      input: {
        cart_id: cartId,
        cart_items: [
          {
            cart_item_id: cart_item_id,
            quantity: quantity,
          },
        ],
      },
    });

    console.log("%c rr", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    if (r.updateCartItems) {
      console.log("%c 更新购物车成功", "color:green;font-weight:bold");
      dispatch("fetchCart", { cartId });
    }
  },

  async removeItemFromCart({ commit, state, dispatch }, { cart_item_id }) {
    let code = this.$i18n.locale;
    let cartId = state.cartId[code];
    let r = await this.$axios.post("/api/guestcheckout/removeItemFromCart", {
      input: {
        cart_id: cartId,
        cart_item_id: cart_item_id,
      },
    });

    console.log("%c r", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    if (r.removeItemFromCart) {
      console.log("%c 移除商品成功", "color:green;font-weight:bold");
      dispatch("fetchCart", { cartId });
    }
  },

  async addContactCart({ commit, state, dispatch }, { contact, cartId }) {
    console.log("%c cartId", "color:green;font-weight:bold");
    console.log(JSON.stringify(cartId));

    let r = await this.$axios.post("/api/guestcheckout/oneStepCheckout", {
      cart_id: cartId,
      address: contact,
    });

    console.log("%c 一步支付返回", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    if (r.setPaymentMethodOnCart) {
      this.$router.push("/checkout/shipping-payment/" + cartId);
    }
  },

  async setShippingMethodsOnCart(
    { commit, state, dispatch },
    { carrier_code, method_code, cartId }
  ) {
    let code = this.$i18n.locale;

    console.log("%c cartId", "color:green;font-weight:bold");
    console.log(JSON.stringify(cartId));

    let r = await this.$axios.post(
      "/api/guestcheckout/setShippingMethodsOnCart",
      {
        input: {
          cart_id: cartId,
          shipping_methods: [
            {
              carrier_code,
              method_code,
            },
          ],
        },
      }
    );

    console.log("%c 设置物流方式返回", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));

    dispatch("fetchCart", { cartId });

    let payments = r.setShippingMethodsOnCart.cart.available_payment_methods;

    commit("setAvaliablePaymentMethod", {
      paymentMethod: payments,
    });
  },

  async setPaymentMethodOnCart(
    { commit, state, dispatch },
    { payment_method, cartId }
  ) {
    console.log("%c cartId", "color:green;font-weight:bold");
    console.log(JSON.stringify(cartId));

    let r = await this.$axios.post(
      "/api/guestcheckout/setPaymentMethodOnCart",
      {
        input: {
          cart_id: cartId,
          payment_method: {
            code: payment_method,
          },
        },
      }
    );

    dispatch("fetchCart", { cartId });

    console.log("%c 设置支付方式返回", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
  },

  async placeOrder({ commit, state, dispatch }, { cartId }) {
    let code = this.$i18n.locale;
    let r = await this.$axios.post("/api/guestcheckout/placeOrder", {
      cart_id: cartId,
    });

    if (!r.placeOrder) {
      return "支付失败";
    }

    console.log("%c 下单成功", "color:green;font-weight:bold");
    console.log(JSON.stringify(r));
    commit("removeCart", code);
    commit("setCartQTY", { code, qty: 0 });

    dispatch("pay", {
      paymentMethod: "paypal",
      orderId: r.placeOrder.order.order_number,
    });
  },

  async pay({ dispatch, commit }, { orderId, paymentMethod }) {
    if (paymentMethod === "paypal") {
      let r = await this.$axios.post("/api/payment/paypalCreate", {
        orderId,
      });
      console.log("%c 支付结果", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      let paypalApproveLink = r.links.find((z) => z.rel === "approve");

      // console.log("%c paypalApproveLink", "color:green;font-weight:bold");
      // console.log(JSON.stringify(paypalApproveLink));

      window.location.href = paypalApproveLink.href;
    }
  },
};
