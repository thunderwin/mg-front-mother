<template>
  <div class="is-capitalized has-text-dark">
    <!-- {{ cart }} -->
    <div v-if="cart.prices" class="summy-part" style="">
      <div class="summy-item my-flex" style="">
        <div class="summy-item-label">{{ $t("c.subtotal") }}:</div>
        <div class="summy-item-amount">
          <span>
            {{
              cart.prices.grand_total.currency === "USD"
                ? "$"
                : "cart.prices.grand_total.currency"
            }}</span
          >
          <span>{{ cart.prices.subtotal_including_tax.value }}</span>
        </div>
      </div>

      <div
        class="summy-item"
        v-if="cart.prices.discounts && cart.prices.discounts.length > 0"
        style=""
      >
        <div
          v-for="(dis, disIndex) in cart.prices.discounts"
          :key="disIndex"
          class="each-discount my-flex"
        >
          <div class="summy-item-label">{{ dis.label }}:</div>
          <div class="summy-item-amount">
            <span>
              <span>-</span>
              {{
                cart.prices.grand_total.currency === "USD"
                  ? "$"
                  : "cart.prices.grand_total.currency"
              }}</span
            >
            <span> {{ dis.amount.value }} </span>
          </div>
        </div>
      </div>

      <div class="summy-item my-flex is-size-5" style="margin-top: 1rem">
        <div class="summy-item-label" style="color: #1b1c1e">
          {{ $t("c.total_price") }}:
        </div>
        <div class="summy-item-amount">
          <span>
            {{
              cart.prices.grand_total.currency === "USD"
                ? "$"
                : "cart.prices.grand_total.currency"
            }}</span
          >
          <span>{{ cart.prices.grand_total.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"],
};
</script>

<style lang="scss" scoped></style>
