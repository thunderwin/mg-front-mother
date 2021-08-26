<template>
  <div>
    <!-- {{ cart }} -->
    <div class="shadow finnal-summart-bpx" style="padding: 0 1rem">
      <div class="eachone my-flex van-hairline--bottom">
        <div class="">
          <div class="has-text-grey">Contact</div>
          <div class="">
            <bdo dir="ltr">{{ cart.email }}</bdo>
          </div>
        </div>
        <div class="">
          <nuxt-link
            class="link--small"
            :to="'/checkout/' + $route.params.cartId"
          >
            <span
              :style="{
                color: $store.state.S.mainColor,
              }"
              aria-hidden="true"
              >Change</span
            >
          </nuxt-link>
        </div>
      </div>

      <div role="row" class="eachone my-flex">
        <div class="review-block__inner">
          <div class="has-text-grey">Ship to</div>
          <div class="review-block__content">
            <div class="" style="margin-right: 1rem">
              {{ showAddress }}
            </div>
          </div>
        </div>
        <div role="cell" class="review-block__link">
          <nuxt-link
            class="link--small"
            :to="'/checkout/' + $route.params.cartId"
          >
            <span
              :style="{
                color: $store.state.S.mainColor,
              }"
              aria-hidden="true"
              >Change</span
            >
          </nuxt-link>
        </div>
      </div>

      <!-- <div class="review-block eachone">
        <div class="review-block__inner">
          <div class="has-text-grey">Method</div>
          <div class="review-block__content">
            {{ selectedShipping }} ·
            <strong class="emphasis">
              <span class="skeleton-while-loading--inline">{{
                shippingPrice
              }}</span>
            </strong>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"],
  data() {
    return {
      showAddress: "",
      selectedShipping: "",
      shippingPrice: "",
    };
  },

  watch: {
    cart: {
      handler: function (v) {
        let a = v.shipping_addresses[0];
        this.showAddress =
          a.street[0] +
          "," +
          a.telephone +
          "," +
          a.postcode +
          "," +
          a.city +
          "," +
          a.country.label;

        let b = a.selected_shipping_method;

        this.selectedShipping = b.method_title;
        this.shippingPrice = b.amount.currency + b.amount.value;
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.finnal-summart-bpx {
  .eachone {
    padding: 0.8rem 0;
  }
}
</style>
