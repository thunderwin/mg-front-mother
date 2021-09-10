<template>
  <div class="promo-wrapper">
    <!-- {{ this.cart }} -->
    <div class="eye-catcher">
      <div v-if="total < 69" class="catcher-row warnbox">
        ❗Just buy ${{ 69 - total }} more to get
        <span style="font-weight: bold">$8</span> OFF!
      </div>

      <div v-if="total >= 69 && total < 99" class="catcher-row successbox">
        🎉 Extra $8 OFF! Checkout Now↓
      </div>

      <div v-if="total >= 69 && total < 99" class="catcher-row warnbox">
        ❗Buy another ${{ 99 - total }} to get
        <span style="font-weight: bold">$15</span>
        OFF!
      </div>

      <div v-if="total >= 99 && total < 149" class="catcher-row successbox">
        🎉 Extra $15 OFF! Checkout Now↓
      </div>

      <div v-if="total >= 99 && total < 149" class="catcher-row warnbox">
        ❗Buy another ${{ 149 - total }} to get
        <span style="font-weight: bold">$30</span> OFF!
      </div>

      <div v-if="total >= 149" class="catcher-row successbox">
        🎉 Extra $30 OFF! Checkout Now↓
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    cart() {
      let code = this.$i18n.locale;
      let carts = this.$store.state.cart.cart;
      return carts[code];
    },
    total() {
      return this.cart.prices.subtotal_excluding_tax.value;
    },
  },
};
</script>

<style lang="scss" scoped>
.warnbox {
  color: #664d03;
  background-color: #fff3cd;
  border-color: #ffecb5;
}
.catcher-row {
  margin-bottom: 0.7rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  padding: 0.25rem 1rem;
}
.successbox {
  color: #0f5132;
  background-color: #d1e7dd;
  border-color: #badbcc;
}
</style>
