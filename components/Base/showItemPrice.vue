<template>
  <div
    :style="{
      color: $store.state.S.BaseShowItemPrice,
    }"
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
        {{ x.price_range.minimum_price.final_price.value }}
      </div>
    </div>

    <div class="showPrice">
      {{ x.show_price }}
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
  },
};
</script>

<style lang="scss" scoped></style>
