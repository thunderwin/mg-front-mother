<template>
  <div>
    <paypal-checkout
      env="sandbox"
      amount="12"
      currency="USD"
      locale="en_US"
      :client="paypal"
      :button-style="myStyle"
      @payment-authorized="paymentAuthorized"
      @payment-completed="paymentCompleted"
      @payment-cancelled="paymentCancelled"
    >
    </paypal-checkout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paypal: {
        sandbox:
          "ASnwz_T0VEvmifWp9MkaKro84lGBjdhNcUAw7lrWeVcNAeg2PzdqY32QxN9wFoxVLwTYmGNKgEJbpilk",
        production: "<production client id>",
      },
      myStyle: {
        label: "checkout",
        size: "medium",
        shape: "pill",
        color: "gold",
      },
    };
  },
  methods: {
    paymentAuthorized(e) {
      console.log("%c 支付被授权", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));
    },
    paymentCompleted(e) {
      console.log("%c 支付完成", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));
    },
    paymentCancelled(e) {
      console.log("%c 支付被取消", "color:green;font-weight:bold");
      console.log(JSON.stringify(e));
    },
  },
};
</script>

<style lang="scss" scoped></style>
