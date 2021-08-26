<template>
  <div>
    <van-radio-group v-model="choosenPaymentMethod">
      <van-cell-group>
        <van-cell
          v-for="(x, index) in paymentMethod"
          :key="index"
          clickable
          class="shadow"
          @click="chosePayment(index)"
        >
          <template #title>
            <span class="custom-title is-size-6">{{ x.title }}</span>
          </template>

          <van-radio slot="right-icon" :name="index" />
          <!-- <van-icon slot="icon" size="25" name="/logos/wechat.svg" /> -->
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <div class="content-box shadow" style="padding: 1rem">
      <div class="my-flex van-hairline--bottom" style="background-color: #fff">
        <div class="radio__label radio__label--inactive">
          <div class="" style="margin-bottom: 1rem">
            <img alt="PayPal" class="" width="100px" :src="'/Paypal.svg'" />
          </div>
        </div>
        <div
          id="payment_gateway_66497413305_description"
          class="visually-hidden"
          aria-live="polite"
          data-detected="Detected card brand: {brand}"
        ></div>
      </div>

      <div class="" style="text-align: center">
        <div class="blank-slate">
          <img style="margin-top: 1rem" width="60px" :src="'/redirect.svg'" />
          <div class="">
            After clicking “Complete order”, you will be redirected to PayPal to
            complete your purchase securely.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["paymentMethod"],
  data() {
    return {
      choosenPaymentMethod: 0,
    };
  },
  methods: {
    chosePayment(index) {
      this.choosenPaymentMethod = index;
      this.$store.dispatch("cart/setPaymentMethodOnCart", {
        payment_method: this.paymentMethod[index].code,
        cartId: this.$route.params.cartId,
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
