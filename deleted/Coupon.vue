<template>
  <div>
    <div class="couponcode">
      <div style="margin-bottom: 1rem">
        {{ $t("c.apply_gift_card") }}
      </div>

      <!-- {{ coupon }} -->

      <div class="my-flex">
        <FormulateInput
          style="margin-bottom: 0"
          v-model="coupon"
          type="text"
          label=""
        />
        <button class="button is-light is-capitalized" @click="applyCode">
          {{ $t("c.apply") }}
        </button>
      </div>

      <!-- {{ cart.applied_coupons.code }} -->
      <div
        v-if="cart.applied_coupons && cart.applied_coupons.length > 0"
        style="margin-top: 1rem"
      >
        <div>
          <van-tag
            closeable
            size="large"
            plain
            style="margin-right: 1rem"
            @close="closeCoupon"
          >
            {{ cart.applied_coupons[0].code }}
          </van-tag>

          {{ $t("c.has_been_applied") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cartId", "cart"],

  data() {
    return {
      coupon: "",
      showCouponBtn: false,
    };
  },
  computed: {},
  methods: {
    async closeCoupon() {
      let r = await this.$store.dispatch("cart/removeCouponFromCart", {});
    },
    async applyCode() {
      let r = await this.$store.dispatch("cart/applyCouponToCart", {
        cartId: this.cartId,
        couponCode: this.coupon,
      });

      if (r.response.errors.length > 0) {
        this.$dialog.alert({
          title: this.$t("c.failed"),
          message: this.$t("c.no_such_promo_code_or_not_avaliable"),
          theme: "round-button",
          confirmButtonColor: "#376b7a",
          confirmButtonText: this.$t("form.confirm"),
        });
      }

      console.log("%c 使用code 返回", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));
    },
  },
};
</script>

<style lang="scss" scoped></style>
