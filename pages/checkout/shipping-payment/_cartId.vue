<template>
  <div class="">
    <client-only>
      <div class="columns shipping-payment" v-if="$device.isDesktop">
        <div class="column is-7">
          <CheckoutFinnalSummaryBox v-if="cart.id" :cart="cart" />

          <div style="margin-bottom: 3rem" class="">
            <div class="is-size-5" style="margin: 1.5rem 0 1rem 0">
              Shipping method
            </div>

            <CheckoutChooseShippingMethod :shippingOption="shippingOption" />

            <div class="is-size-5" style="margin: 1.5rem 0 1rem 0">
              Payment method
            </div>
            <CheckoutChoosePaymentMethod :paymentMethod="paymentMethod" />
          </div>

          <div>
            <button
              class="button is-capitalized"
              :class="isLoading ? 'is-loading' : ''"
              :style="{
                backgroundColor: $store.state.S.mainButtonColor,
                marginTop: '2rem',
              }"
              @click="genPayment"
            >
              Complete order
            </button>
          </div>
        </div>
        <div class="column">
          <CheckoutSummary />
        </div>
      </div>

      <div class="mob" v-if="$device.isMobileOrTablet">
        <CheckoutDropdownSummary v-if="cart" :cart="cart" />

        <div class="shipping-payment" style="padding: 1.5rem">
          <CheckoutFinnalSummaryBox v-if="cart.id" :cart="cart" />

          <div class="is-size-5" style="margin: 1rem 0">Shipping method</div>

          <CheckoutChooseShippingMethod :shippingOption="shippingOption" />

          <div class="is-size-5" style="margin: 1rem 0">Payment method</div>
          <CheckoutChoosePaymentMethod :paymentMethod="paymentMethod" />
        </div>

        <div class="spacer"></div>
      </div>
    </client-only>

    <van-goods-action
      v-if="$device.isMobileOrTablet"
      style="overflow: hidden; width: 100%"
      class="van-hairline--top bg-white"
    >
      <van-goods-action-button
        :loading="isLoading"
        :color="'#000'"
        type="danger"
        text="Complete order"
        style="font-weight: bold"
        @click="genPayment"
      />
    </van-goods-action>

    <!-- <CheckoutPaypalPayment /> -->
  </div>
</template>

<script>
export default {
  async validate({ params, query, store }) {
    if (!params.cartId) return false;
    return true;
  },
  scrollToTop: true,
  mounted() {
    this.cartId = this.$route.params.cartId;
    this.initCheckout();
  },
  data() {
    return {
      shippingOption: [],
      paymentMethod: [],
      cartId: "",
      cart: {},
      isLoading: false,
    };
  },

  methods: {
    async initCheckout() {
      let cart = await this.$store.dispatch("cart/fetchCart", {
        cartId: this.cartId,
      });

      if (!cart) {
        this.$nuxt.error({ message: "page not found", statusCode: 404 });
        return;
      }

      console.log("%c 购物车信息", "color:green;font-weight:bold");
      console.log(JSON.stringify(cart));
      this.cart = cart;

      this.shippingOption =
        cart.shipping_addresses[0].available_shipping_methods;
      this.paymentMethod = cart.available_payment_methods;
    },

    async genPayment() {
      this.isLoading = true;
      let r = await this.$axios.post("/api/payment/paypalCreate", {
        cartId: this.cartId,
      });
      this.isLoading = false;

      let paypalApproveLink = r.links.find((z) => z.rel === "approve");

      // console.log("%c paypalApproveLink", "color:green;font-weight:bold");
      // console.log(JSON.stringify(paypalApproveLink));

      window.location.href = paypalApproveLink.href;
    },

    async placeOrder() {
      this.isLoading = true;
      let r = await this.$store.dispatch("cart/placeOrder", {
        cartId: this.cartId,
      });
      this.isLoading = false;
    },
  },
};
</script>

<style lang="scss" scoped></style>
