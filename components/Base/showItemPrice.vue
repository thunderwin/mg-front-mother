<template>
  <div
    :style="{
      color: $store.state.S.BaseShowItemPrice,
    }"
    class="my-flex"
    style="justify-content: flex-start"
  >
    <div
      v-if="x.price_range"
      style="justify-content: flex-start; padding: 0"
      class="price-center my-flex"
    >
      <div style="margin-right: 0.2rem" :class="'is-size-' + fontSize">
        {{ curr }}
      </div>

      <div :class="'is-size-' + fontSize">
        {{ realPrice.toFixed(0) }}
      </div>
    </div>

    <div
      class="showPrice"
      :class="'has-text-grey is-size-' + (fontSize + 1)"
      style="text-decoration: line-through; margin-left: 0.5rem"
    >
      {{ curr }}
      {{ (x.show_price ? x.show_price : realPrice * 1.6).toFixed(0) }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    x: {
      type: Object,
      default() {
        return {};
      },
    },

    fontSize: {
      type: Number,
      default() {
        return 6;
      },
    },
  },
  computed: {
    curr() {
      let cu = this.x.price_range.minimum_price.final_price.currency;
      return cu === "USD" ? "$" : cu;
    },
    realPrice() {
      return this.x.price_range.minimum_price.final_price.value;
    },
  },
};
</script>

<style lang="scss" scoped></style>
