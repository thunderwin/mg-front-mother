<template>
  <div>
    <div v-if="cart && cart.items" class="cart">
      <div
        v-for="(item, index) in cart.items"
        :key="index"
        style="display: flex; width: 100%; justify-content: space-between"
      >
        <CheckoutLineItemReadOnly :x="item" />
      </div>
    </div>

    <CartCoupon :cart="cart" :cartId="cartId" />
    <CartSummy :cart="cart" />
  </div>
</template>

<script>
export default {
  props: ["cartId"],
  data() {
    return {
      cart: {},
    };
  },

  created() {
    console.log("%c created", "color:green;font-weight:bold");
    let code = this.$i18n.locale;
    this.cart = this.$store.getters["cart/cart"](code);
  },
};
</script>

<style lang="scss" scoped></style>
