<template>
  <div class="mob-cart-wrapper">
    <div class="is-size-4" style="padding: 1rem">My Cart</div>
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
        :cartId="cartId"
      />

      <CartSummy style="padding: 1rem" :cart="cart" />

      <div class="spacer"></div>

      <van-goods-action
        v-if="$device.isMobileOrTablet"
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
  computed: {
    cart() {
      let code = this.$i18n.locale;
      let carts = this.$store.getters["cart/cart"](code);
      return carts;
    },
    cartId() {
      let code = this.$i18n.locale;
      let cartIds = this.$store.state.cart.cartId;
      return cartIds[code];
    },
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
