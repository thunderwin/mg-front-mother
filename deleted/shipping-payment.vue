<template>
  <div class="">
    <div class="container">
      <div class="is-size-5" style="margin: 1rem 0">
        Choose Shipping menthod
      </div>

      <van-radio-group v-model="choosenShippingMethod">
        <van-cell-group>
          <van-cell
            v-for="(x, index) in shippingOption"
            :key="index"
            clickable
            @click="chose(index)"
          >
            <template #title>
              <span class="custom-title is-size-5">{{ x.carrier_title }}</span>

              <span class="shipping-price">
                {{ x.amount.currency }}{{ x.amount.value }}
              </span>
            </template>
            <van-radio slot="right-icon" :name="index" />
            <!-- <van-icon slot="icon" size="25" name="/logos/wechat.svg" /> -->
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div class="is-size-5" style="margin: 1rem 0">Choose Payment menthod</div>

      <!-- {{ paymentMethod }} -->

      <van-radio-group v-model="choosenPaymentMethod">
        <van-cell-group>
          <van-cell
            v-for="(x, index) in paymentMethod"
            :key="index"
            clickable
            @click="chosePayment(index)"
          >
            <template #title>
              <span class="custom-title is-size-5">{{ x.title }}</span>
            </template>

            <van-radio slot="right-icon" :name="index" />
            <!-- <van-icon slot="icon" size="25" name="/logos/wechat.svg" /> -->
          </van-cell>
        </van-cell-group>
      </van-radio-group>

      <div>
        <button
          class="button is-capitalized"
          :style="{
            backgroundColor: $store.state.S.mainColor,
            marginTop: '2rem',
          }"
          @click="goPay"
        >
          {{ $t("c.continue_to_payment") }}
        </button>
      </div>

      <!-- <van-goods-action
        v-if="$device.isMobileOrTablet"
        style="overflow: hidden; width: 100%"
        class="van-hairline--top bg-white"
      >
        <van-goods-action-button
          :color="'#000'"
          type="danger"
          text="Continue to payment"
          style="font-weight: bold"
        />
      </van-goods-action> -->

      <!-- <CheckoutPaypalPayment /> -->
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.shippingOption = this.$store.state.cart.avaliableShippingMethod;
  },
  data() {
    return {
      shippingOption: [],
      choosenShippingMethod: 0,
      choosenPaymentMethod: 0,
    };
  },

  computed: {
    paymentMethod() {
      return this.$store.state.cart.avaliablePaymentMethod;
    },
  },
  methods: {
    chose(index) {
      this.choosenShippingMethod = index;
      this.$store.dispatch(
        "cart/setShippingMethodsOnCart",
        this.shippingOption[index]
      );
    },
    chosePayment(index) {
      this.choosenPaymentMethod = index;
      this.$store.dispatch("cart/setPaymentMethodOnCart", {
        payment_method: this.paymentMethod[index].code,
      });
    },

    async goPay() {
      let r = await this.$store.dispatch("cart/pay", {
        paymentMethod: "paypal",
      });

      console.log("%c 支付请求结果", "color:green;font-weight:bold");
      console.log(JSON.stringify(r));

      // this.$store.dispatch("cart/placeOrder", {});
    },
  },
};
</script>
