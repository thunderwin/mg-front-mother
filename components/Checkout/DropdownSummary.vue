<template>
  <div>
    <van-collapse
      class="checkout-summary"
      v-model="active"
      style="background: #ebedf0 !important"
    >
      <van-collapse-item name="cart">
        <template #title>
          <div class="my-flex">
            <div class="my-flex">
              <van-icon size="1.3rem" name="cart-o" />
              <span style="margin-left: 1rem" class="is-size-6">
                {{ !!active[0] ? "Hidden" : "Show" }} cart summary</span
              >
            </div>

            <span
              v-if="cart.prices"
              class="is-size-5"
              style="margin-right: 1rem"
            >
              {{
                cart.prices.grand_total.currency === "USD"
                  ? "$"
                  : "cart.prices.grand_total.currency"
              }}
              {{ cart.prices.grand_total.value }}</span
            >
          </div>
        </template>

        <CheckoutSummary style="" />
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  props: ["cart"],
  data() {
    return {
      active: [],
    };
  },
};
</script>

<style lang="scss">
.checkout-summary .van-cell {
  background-color: #fafafa !important;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
}
</style>
