<template>
  <div class="box" style="padding: 1rem; text-transform: capitalize">
    <client-only>
      <div class="" style="font-size: 1.5rem; font-weight: bold">
        {{ $t("c.summary") }}
      </div>

      <!-- {{ this.$store.state.cart.cartDate }} -->

      <div
        class="items"
        v-if="showItems && !!cart"
        style="overflow: auto; max-height: 350px"
      >
        <hr class="checkoutline" />

        <div
          v-for="(item, index) in cart.items"
          :key="index"
          style="display: flex; width: 100%; justify-content: space-between"
        >
          <!-- {{ item }} -->

          <CheckoutLineItem
            :mob="mob"
            :readOnly="true"
            :simpleItem="simpleItem"
            :showEditBtn="false"
            :x="item"
          />
        </div>
        <hr class="checkoutline" />
      </div>

      <CheckoutCoupon v-if="cart" :cartId="cartId" :cart="cart" />
      <hr class="checkoutline" />

      <div
        class="summy-part"
        style="font-weight: bold; font-size: 16px"
        v-if="!!cart"
      >
        <div class="summy-item" style="color: #a3a3a3">
          <div class="summy-item-label">{{ $t("c.subtotal") }}:</div>
          <div class="summy-item-amount">
            <span>HK$</span>
            {{ cart.prices.subtotal_including_tax.value }}
          </div>
        </div>

        <div
          class="summy-item"
          v-if="
            cart.prices && cart.prices.discount && cart.prices.discount.amount
          "
          style="color: #a3a3a3"
        >
          <div class="summy-item-label">
            {{ cart.prices.discount.label[0] }}:
          </div>
          <div class="summy-item-amount">
            <span>HK$</span>
            {{ cart.prices.discount.amount.value }}
          </div>
        </div>

        <div class="summy-item" style="font-size: 22px; margin-top: 20px">
          <div class="summy-item-label" style="color: #1b1c1e">
            {{ $t("c.total_price") }}:
          </div>
          <div class="summy-item-amount">
            <span>HK$</span> {{ cart.prices.grand_total.value }}
          </div>
        </div>
      </div>

      <div
        class="actionbu"
        style="width: 100%; font-weight: bold; padding: 1rem"
      >
        <button
          class="button is-capitalized"
          :class="isLoading ? 'is-loading' : ''"
          v-if="$route.path !== '/checkout'"
          @click="goCheckout"
          :style="{
            backgroundColor: $store.state.S.mainColor,
          }"
        >
          {{ $t("c.checkout") }}
        </button>
        <LazyCheckoutPaypalPayment />
      </div>
    </client-only>
  </div>
</template>

<script>
export default {
  props: ["showItems", "simpleItem", "mob"],

  data() {
    return {
      coupon: "",
      isLoading: false,
    };
  },
  async beforeMount() {
    await this.$store.dispatch("cart/fetchCart");
  },
  computed: {
    // checkoutSummy: function() {
    //   return this.$store.getters["checkout/checkoutSummy"];
    // },
    cart() {
      let code = this.$i18n.locale;
      let carts = this.$store.getters["cart/cart"](code);
      return carts;
    },

    cartId() {
      let code = this.$i18n.locale;
      console.log("%c code", "color:green;font-weight:bold");
      console.log(JSON.stringify(code));
      let cartIds = this.$store.state.cart.cartId;
      return cartIds[code];
    },
  },
  mounted() {
    // this.getCart();
  },
  methods: {
    goCheckout() {
      this.isLoading = true;
      this.$store.dispatch("cart/startCheckout");
    },
    // async getCart() {
    //   let r = await this.$store.dispatch("cart/fetchCart", {
    //     cartId: this.cartId
    //   });

    //   console.log("%c r", "color:green;font-weight:bold");
    //   console.log(JSON.stringify(r));

    //   this.cart = r.cart;
    //   this.price = r.cart.prices;
    // },

    async nextStep(e) {
      console.log("%c nextStep", "color:green;font-weight:bold");
      console.log(JSON.stringify(11));

      console.log("%c 当前的路由", "color:green;font-weight:bold");
      console.log(this.$route.path);

      if (this.$route.path !== "/checkout") {
        let localPath = await this.localePath("/");
        // 如果不在结账页面，就去
        this.$router.push(localPath + "/checkout");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.summy-part .summy-item {
  display: flex;
  justify-content: space-between;
}

.checkoutline {
  height: 1px;
  color: #a3a3a3;
}
</style>
