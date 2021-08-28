<template>
  <div class="mob-cart-wrapper">
    <div class="is-size-4" style="padding: 1rem">
      <span>My Cart</span>
      <span style="font-weight: normal">
        ( {{ cart.total_quantity }} {{ $t("c.items") }} )</span
      >
    </div>

    <div v-if="cart && cart.items.length > 0">
      <CartPromo />

      <div
        class="cart-item van-hairline--bottom"
        v-for="(items, index) in cart.items"
        :key="index"
      >
        <CartLineItem :x="items"></CartLineItem>
      </div>

      <CartCoupon
        @reloadCart="reloadCart"
        style="padding: 1rem"
        :cart="cart"
        :cartId="cart.id"
      />

      <CartSummy style="padding: 1rem" :cart="cart" />

      <!-- <CartGoCheckoutButtons v-if="$device.isDesktop" /> -->

      <!-- 都用同一个 -->

      <div class="spacer"></div>

      <van-goods-action
        style="overflow: hidden; width: 100%; z-index: 10000"
        class="van-hairline--top bg-white"
      >
        <van-goods-action-button
          :color="'#000'"
          type="danger"
          @click="goCheckout"
          text="Checkout "
          style="font-weight: bold"
        />
      </van-goods-action>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: "",
    };
  },
  computed: {
    // cart: {
    //   get() {
    //     let code = this.$i18n.locale;
    //     let carts = this.$store.getters["cart/cart"](code);
    //     return carts;
    //   },
    //   set(v) {
    //     return;
    //   },
    // },
    // cartId() {
    //   let code = this.$i18n.locale;
    //   let cartIds = this.$store.state.cart.cartId;
    //   return cartIds[code];
    // },
  },

  beforeMount() {
    let code = this.$i18n.locale;
    this.cart = this.$store.getters["cart/cart"](code);
  },

  methods: {
    async reloadCart() {
      console.log("%c 重新load购物车", "color:green;font-weight:bold");
      this.cart = await this.$store.dispatch("cart/fetchCart", {
        cartId: this.cart.id,
      });

      // this.getShoppingCartCross();
    },
    goCheckout() {
      this.$store.commit("setCartPopup", false);

      this.$store.dispatch("cart/startCheckout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
