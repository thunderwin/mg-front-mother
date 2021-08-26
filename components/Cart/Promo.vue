<template>
  <div class="promo-wrapper">
    <div class="eye-catcher">
      <div v-if="total === 1" class="catcher-row warnbox">
        ❗Just buy 1 more item to get 5% OFF!
      </div>

      <div v-if="total >= 2" class="catcher-row successbox">
        🎉 Extra 5% OFF! Checkout Now↓
      </div>

      <div v-if="total === 2" class="catcher-row warnbox">
        ❗Buy another ¥1.00 to get FREE shipping!
      </div>

      <div v-if="total >= 3" class="catcher-row successbox">
        🚚 Free Shipping Now↓
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
      return this.cart.total_quantity;
    },
    showText() {
      switch (this.cart.qiuca) {
        case "1":
          return "❗Just buy 1 more item to get 5% OFF!";
        case "2":
          return;
      }
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
