<template>
  <div>
    <div class="couponcode">
      <div style="margin-bottom: 1rem">Apply coupon code</div>

      <!-- {{ coupon }} -->

      <div
        v-if="cart.applied_coupons && cart.applied_coupons.length > 0"
        style="margin-top: 1rem"
        class="my-flex"
      >
        <div>
          <span class="tag is-warning is-medium">
            <span>{{ cart.applied_coupons[0].code }}</span>
            <button
              :class="loading2 ? 'is-loading' : ''"
              @click="closeCoupon"
              class="delete is-small"
            ></button>
          </span>

          <span>Has been applied</span>
        </div>

        <button
          class="button is-light is-capitalized"
          :class="loading2 ? 'is-loading' : ''"
          @click="closeCoupon"
        >
          Remove
        </button>
      </div>

      <div v-else class="applied-coupon">
        <div class="my-flex">
          <div class="sdsdsd">
            <FormulateInput
              style="width: 100%; margin-right: 1rem"
              v-model="coupon"
              @blur="inputCoupon"
              type="text"
              label=""
            />
          </div>

          <button
            class="button is-light is-capitalized"
            :class="loading ? 'is-loading' : ''"
            @click="applyCode"
          >
            Apply
          </button>
        </div>

        <div style="color: #960505" v-if="showError" class="showError">
          Coupon code is required
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cart"],

  data() {
    return {
      coupon: "",
      showCouponBtn: false,
      showError: false,
      loading: false,
      loading2: false,
    };
  },
  methods: {
    async closeCoupon() {
      this.loading2 = true;
      let r = await this.$axios.post(
        "/api/guestcheckout/removeCouponFromCart",
        {
          input: {
            cart_id: this.cart.id,
          },
        }
      );
      console.log("%c 移除coupon结果", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));
      this.$emit("reloadCart");

      console.log("%c this.finalCart", "color:green;font-weight:bold");
      console.log(JSON.stringify(this.finalCart));

      this.loading2 = false;
    },
    inputCoupon() {
      this.showError = false;
    },
    async applyCode() {
      if (!this.coupon) {
        this.showError = true;
        return;
      }

      this.loading = true;

      let r = await this.$axios.post("/api/guestcheckout/guestCartCoupon", {
        input: {
          cart_id: this.cart.id,
          coupon_code: this.coupon,
        },
      });

      this.coupon = "";

      this.loading = false;

      console.log("%c 使用返回", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      if (r.response && r.response.errors && r.response.errors.length > 0) {
        this.$dialog.alert({
          title: "",
          message: r.response.errors[0].message,
          theme: "round-button",
          confirmButtonColor: this.$store.state.S.mainColor,
          confirmButtonText: "OK",
        });
        return;
      }

      console.log("%c r", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      this.$emit("reloadCart");

      return;
    },
  },
};
</script>

<style lang="scss" scoped>
.couponcode .formulate-input {
  margin-bottom: 0 !important;
}
</style>
