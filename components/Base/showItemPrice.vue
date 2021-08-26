<template>
  <div
    :style="{
      color: $store.state.S.BaseShowItemPrice,
    }"
  >
    <div
      v-if="price_range"
      style="justify-content: flex-start; padding: 0"
      class="price-center my-flex"
    >
      <div :class="'is-size-' + fontSize" style="">
        {{ curr }}
      </div>

      <div :class="' is-size-' + fontSize">
        {{ price_range.minimum_price.final_price.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["price_range", "fontSize"],
  computed: {
    curr() {
      return this.price_range.minimum_price.final_price.currency === "USD"
        ? "$"
        : this.price_range.minimum_price.final_price.currency;
    },
  },
};
</script>

<style lang="scss" scoped></style>
