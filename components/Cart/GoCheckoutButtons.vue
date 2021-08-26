<template>
  <div>
    <div class="actionbu" style="width: 100%; margin-top: 1rem">
      <button
        class="button is-capitalized"
        :class="isLoading ? 'is-loading' : ''"
        v-if="$route.path !== '/checkout'"
        @click="goCheckout"
        :style="{
          backgroundColor: $store.state.S.mainButtonColor,
          width: '100%',
        }"
      >
        {{ $t("c.checkout") }}
      </button>
      <!-- <LazyCheckoutPaypalPayment style="margin-top: 1rem" /> -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    goCheckout() {
      this.isLoading = true;
      this.$store.dispatch("cart/startCheckout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
