<template>
  <div class="checkout_address" style="margin-top: 20px">
    <van-radio-group v-model="method">
      <van-cell-group>
        <!-- <van-cell title="支付宝" clickable @click="method = 'alipay'">
          <van-radio slot="right-icon" name="alipay" />
        </van-cell> -->

        <van-cell title="微信支付" clickable @click="method = 'wechat'">
          <van-radio slot="right-icon" name="wechat" />
          <van-icon slot="icon" size="25" name="/logos/wechat.svg" />
        </van-cell>

        <van-cell
          icon="credit-pay"
          title="信用卡"
          clickable
          @click="method = 'credit'"
        >
          <van-radio slot="right-icon" name="credit" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <CreditCardInput
      v-if="method === 'credit'"
      style="margin-top: 20px"
      ref="creditCard"
    ></CreditCardInput>
  </div>
</template>

<script>
export default {
  name: "",

  mixins: [],

  props: ["draftOrderId", "isWechatApp"],

  data() {
    return {
      method: "",

      payLoad: {}, //
    };
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    async makePayment() {
      if (this.method === "alipay") {
        this.$store.dispatch("adminCheckout/alipay", this.draftOrderId);
      } else if (this.method === "wechat") {
        let r = await this.$store.dispatch(
          "adminCheckout/wechat",
          this.draftOrderId
        );

        window.location.href = r.cashierUrl; // 这个不会让google 显示警告
      } else if (this.method === "credit") {
        this.stripePay();
      } else {
        console.log("还没选择支付方式" + JSON.stringify());
      }
    },

    async stripePay() {
      let creditInfo = this.$refs.creditCard.finalCard();
      console.log("最终拿到的信用卡信息" + JSON.stringify(creditInfo));

      this.$store.dispatch("adminCheckout/stripePay", {
        creditInfo: creditInfo,
        draftOrderId: this.draftOrderId,
      });
    },
  },
};
</script>
